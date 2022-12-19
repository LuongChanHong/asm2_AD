import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { get } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./hotelList.css";

const renderHotelItem = (item, index) => {
  return (
    <tr key={index}>
      <td>{++index}</td>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td>{item.title}</td>
      <td>{item.city}</td>
      <td>
        <button className="hotelList__button--delete button button--red">
          Delete
        </button>
      </td>
    </tr>
  );
};

const HotelList = () => {
  const [hotelList, setHotelList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllHotel = async () => {
      const allHotel = await get("/get-all-hotel");
      console.log(allHotel.data);
      setHotelList(allHotel.data);
    };
    getAllHotel();
  }, []);

  return (
    <Wrapper>
      <section className="hotelList__container py-3">
        <section className="hotelList__wrapper">
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <div className="d-flex justify-content-between">
              <h3>Hotel List</h3>
              <button
                onClick={() => navigate("/add-hotel")}
                className="hotelList__button--add button button--green"
              >
                Add new hotel
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {hotelList.length > 0 ? (
                  hotelList.map((hotel, i) => renderHotelItem(hotel, i))
                ) : (
                  <tr>
                    <td colSpan={7}>No hotel found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default HotelList;
