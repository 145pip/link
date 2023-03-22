import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import YesButton from "./common/YesButton";
import CloseButton from "./common/CloseButton";

export default function Modal({ handleModalClose, message }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (message === "reset") {
      setTitle("리셋 하시겠습니까?");
    }
    if (message === "stage") {
      setTitle("스테이지를 선택하시겠습니까?");
    }
  }, [message]);

  return (
    <ModalWrapper onClick={handleModalClose}>
      <ModalArea>
        <h4>{title}</h4>
        <YesButton message={message} />
        <CloseButton onClose={handleModalClose} />
      </ModalArea>
    </ModalWrapper>
  );
}

const ModalArea = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 300px;
  height: 200px;
  border: 1px solid lightgray;
  border-radius: 8.5px;
  z-index: 30;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  h4 {
    text-align: center;
    font-size: 20px;
    position: relative;
    top: 7vh;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
`;

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
