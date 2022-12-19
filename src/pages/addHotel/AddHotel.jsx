import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import { get } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./addHotel.css";

const AddHotel = () => {
  const [input, setInput] = useState({
    name: "",
    type: "hotel",
    address: "",
    city: "Ho Chi Minh",
    distance: 50,
    title: "",
    description: "",
    price: 100,
    image: "",
    featured: "yes",
    rooms: [],
  });
  const [roomList, setRoomList] = useState([]);

  const hotelTypeList = useSelector((state) => state.hotel.types);
  const cityList = useSelector((state) => state.hotel.cities);
  const featureOptions = [
    { name: "Yes", value: "yes" },
    { name: "No", value: "no" },
  ];

  useEffect(() => {
    const getAllRoom = async () => {
      const response = await get("/get-all-room");
      console.log("response.data:", response.data);
      if (response) {
        setRoomList(response.data);
      }
    };
    getAllRoom();
  }, []);

  const handleEvent = (event) => {
    // console.log("event:", event.target);
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        value: target.value,
        checked: target.checked,
      };
    } else {
      return {
        name: target.name,
        value: target.value,
      };
    }
  };

  const handleChange = (event) => {
    const { name, value } = handleEvent(event);
    setInput({ ...input, [name]: value });
  };

  const handleAddHotel = (event) => {
    event.preventDefault();
    console.log("input:", input);
  };

  const renderInput = (label, name, value, type) => {
    return (
      <div className="addHotel__form--item  align-items-center">
        <span>{label}:</span>
        <input
          className="addHotel__form--input input-underline input-outline-none"
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  };

  const renderOptionInput = (label, name, optionList) => {
    return (
      <div className="addHotel__form--item">
        <span>{label}:</span>
        <select
          selected={optionList[0].value}
          className="addHotel__form--select input-outline-none w-100 mt-2"
          name={name}
          onChange={handleChange}
        >
          {optionList.map((option, i) => (
            <option key={i} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Wrapper>
      <section className="addHotel__container py-3">
        <section className="addHotel__wrapper">
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <h3>Add New Hotel</h3>
            <div className="addHotel__form--wrapper">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    {renderInput("Name", "name", input.name, "text")}
                    {renderInput("Address", "address", input.address, "text")}
                    <div className="row">
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput("Type", "type", hotelTypeList)}
                      </div>
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput("City", "city", cityList)}
                      </div>
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput(
                          "Feature",
                          "feature",
                          featureOptions
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        {renderInput(
                          "Distance from city center",
                          "distance",
                          input.distance,
                          "number"
                        )}
                      </div>
                      <div className="col-md-12 col-lg-6">
                        {renderInput("Price", "price", input.price, "number")}
                      </div>
                    </div>
                    {renderInput("Title", "title", input.title, "text")}
                    {renderInput(
                      "Desciption",
                      "desciption",
                      input.description,
                      "text"
                    )}

                    {renderInput("Image Link", "image", input.image, "text")}
                  </div>

                  <div className="col-md-12 col-lg-6">
                    <span>Room List</span>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th className="text-center">Max people</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomList.map((room, i) => (
                          <tr>
                            <td>{++i}</td>
                            <td>{room.title}</td>
                            <td>{room.price}</td>
                            <td className="text-center">{room.maxPeople}</td>
                            <td>
                              <input type="checkbox"></input>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mt-2 d-flex justify-content-center">
                    <button
                      onClick={handleAddHotel}
                      className="addHotel__button  button button--green"
                    >
                      Button
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default AddHotel;
