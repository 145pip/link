import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setMode } from "../../redux/screenModeSlice";

export default function StageSelectionFunction() {
  const dispatch = useDispatch();
  const handleStageSelection = () => {
    dispatch(setMode("StageSelection"));
  };
  return (
    <>
      <h4>스테이지를 선택하시겠습니까?</h4>
      <ModalButton type="button" onClick={handleStageSelection}>
        Yes
      </ModalButton>
    </>
  );
}

const ModalButton = styled.button`
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
  z-index: 20;
  cursor: pointer;
`;
