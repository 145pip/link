import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setMode } from "../../../redux/screenModeSlice";

export default function SelectionButton() {
  const dispatch = useDispatch();
  const handleStageSelection = () => {
    dispatch(setMode("StageSelection"));
  };

  return (
    <CommonButton type="button" onClick={handleStageSelection}>
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
  z-index: 20;
  cursor: pointer;
`;
