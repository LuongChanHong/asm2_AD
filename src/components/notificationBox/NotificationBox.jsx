import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { post } from "../../utils/fetch";

import "../../App.css";
import "./notificationBox.css";

const NotificationBox = (props) => {
  const [isModalOpen, setModalOpen] = useState(props.isOpen);
  const [resText, setResText] = useState("");
  // console.log("props.hotel:", props.hotel);
  // console.log("isModalOpen:", isModalOpen);

  const handleDelete = async () => {
    const response = await post(props.api, { id: props.hotel._id });
    if (response.data !== "") {
      setResText(response.data);
    } else {
      props.handleOpenModal();
    }
  };

  return (
    <section className="modal__container">
      <section className="modal__wrapper modal">
        <Modal
          show={isModalOpen}
          onHide={() => props.handleOpenModal()}
          // backdrop="static"
          // keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="warning-text">Delete Comfirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              {resText === ""
                ? `Delete ${props.hotel.name} ${props.hotel.type} `
                : `${resText}`}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            {resText === "" ? (
              <button
                className="modal__button button button--red"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            ) : (
              <button
                className="modal__button button button--green"
                onClick={() => props.handleOpenModal()}
              >
                Close
              </button>
            )}
          </Modal.Footer>
        </Modal>
      </section>
    </section>
  );
};

export default NotificationBox;
