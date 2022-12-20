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
    room: [],
  });
  const [inputValid, setInputValid] = useState({
    name: true,
    address: true,
    distance: true,
    title: true,
    room: true,
    description: true,
    price: true,
    image: true,
  });
  const [isInputsValid, setInputsValid] = useState(true);
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
      // console.log("response.data:", response.data);
      if (response) {
        setRoomList(response.data);
      }
    };
    getAllRoom();
  }, []);

  // ===================================================================
  // RENDER - START
  // ===================================================================

  const renderCharInput = (label, name, value) => {
    const type = typeof value === "string" ? "text" : "number";
    // console.log(inputValid[name]);
    return (
      <div className="addHotel__form--item align-items-center">
        <span className={`${inputValid[name] ? `` : `warning-text`}`}>
          {label}:
        </span>
        <input
          className={`addHotel__form--input ${
            inputValid[name] ? `` : `input-warning`
          } input-underline input-outline-none`}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  };

  const renderTextArea = (label, name, value) => {
    return (
      <div className="addHotel__form--item w-100 align-items-center">
        <p className={`${inputValid.image ? `` : `warning-text`}`}>{label}:</p>
        <textarea
          className="w-100 input-outline-none"
          name={name}
          value={value}
          onChange={handleChange}
          rows="4"
          // cols="50"
        ></textarea>
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

  // ===================================================================
  // RENDER - END
  // ===================================================================

  // ===================================================================
  // HANDLER - START
  // ===================================================================

  const handleEvent = (event) => {
    // console.log("event:", event.target);
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        name: target.name,
        value: target.value,
        type: target.type,
        checked: target.checked,
      };
    } else {
      return {
        name: target.name,
        value: target.value,
        type: target.type,
      };
    }
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = handleEvent(event);

    if (type === "checkbox") {
      const selectedCheckBox = checked
        ? [...input[name], value]
        : input[name].filter((item) => item != value);
      setInput({
        ...input,
        [name]: selectedCheckBox,
      });
    } else {
      setInput({ ...input, [name]: value });
    }

    console.log("input:", input);
  };

  const arrayValidation = (name, value) => {
    const isValid = value.length !== 0 ? true : false;
    setInputValid({ ...inputValid, [name]: isValid });
    return isValid;
  };

  const textValidation = (name, value) => {
    const isValid = value !== "" ? true : false;
    setInputValid({ ...inputValid, [name]: isValid });
    return isValid;
  };

  const numberValidation = (name, value) => {
    const isValid = value !== 0 ? true : false;
    setInputValid({ ...inputValid, [name]: isValid });
    return isValid;
  };

  const inputValidation = () => {
    let isAllValid = true;
    for (const attri in input) {
      if (typeof input[attri] === "string") {
        isAllValid &= textValidation(attri, input[attri]);
      }
      if (typeof input[attri] === "number") {
        isAllValid &= numberValidation(attri, input[attri]);
      }
      if (typeof input[attri] === "object") {
        isAllValid &= arrayValidation(attri, input[attri]);
      }
    }
    setInputsValid(isAllValid);
  };

  const handleAddHotel = (event) => {
    event.preventDefault();

    inputValidation();
    console.log(inputValid);
  };

  // ===================================================================
  // HANDLER - END
  // ===================================================================

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
                    {renderCharInput("Name", "name", input.name)}
                    {renderCharInput("Address", "address", input.address)}
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
                        {renderCharInput(
                          "Distance from city center",
                          "distance",
                          input.distance
                        )}
                      </div>
                      <div className="col-md-12 col-lg-6">
                        {renderCharInput("Price", "price", input.price)}
                      </div>
                    </div>
                    {renderCharInput("Title", "title", input.title)}
                    {renderCharInput(
                      "Desciption",
                      "description",
                      input.description
                    )}
                    {renderTextArea("Image Link", "image", input.image)}
                  </div>

                  <div className="col-md-12 col-lg-6">
                    <span
                      className={`${inputValid.room ? `` : `warning-text`}`}
                    >
                      Room List
                    </span>
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
                          <tr key={i}>
                            <td>{++i}</td>
                            <td>{room.title}</td>
                            <td>{room.price}</td>
                            <td className="text-center">{room.maxPeople}</td>
                            <td>
                              <input
                                type="checkbox"
                                name="room"
                                value={room._id}
                                onChange={handleChange}
                              ></input>
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
                      className={`addHotel__button button ${
                        isInputsValid ? `button--green` : `button--red`
                      } `}
                    >
                      {isInputsValid ? "Send" : "Some Input Invalid"}
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
