import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setMode } from "../../../redux/screenModeSlice";

export default function YesButton({ message }) {
  const dispatch = useDispatch();

  const handleStageButtonClick = () => {
    if (message === "스테이지를 선택하시겠습니까?") {
      dispatch(setMode("StageSelection"));
    }
  };

  return (
    <CommonButton type="button" onClick={handleStageButtonClick}>
      Yes
    </CommonButton>
  );
}

const CommonButton = styled.button`
  width: 10vw;
  height: 5vh;
  position: relative;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  background-color: rgba(51, 153, 255, 20%);
  color: black;
  border: none;
  z-index: 30;
  cursor: pointer;
`;

YesButton.propTypes = {
  message: PropTypes.string.isRequired,
};
