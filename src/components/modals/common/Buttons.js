import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setMode } from "../../../redux/screenModeSlice";

export default function Buttons({ message, handleModalClose }) {
  const dispatch = useDispatch();

  const handleStageButtonClick = () => {
    if (message === "stage") {
      dispatch(setMode("StageSelection"));
    }
  };

  return (
    <>
      <CommonButton type="button" onClick={handleStageButtonClick}>
        Yes
      </CommonButton>
      <CommonButton type="button" onClick={handleModalClose}>
        No
      </CommonButton>
    </>
  );
}

const CommonButton = styled.button`
  width: 6vw;
  height: 5vh;
  position: relative;
  top: 60%;
  left: 22%;
  margin: 5%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  background-color: rgba(51, 153, 255, 20%);
  color: black;
  border: none;
  z-index: 30;
  cursor: pointer;
`;

Buttons.propTypes = {
  message: PropTypes.string.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
