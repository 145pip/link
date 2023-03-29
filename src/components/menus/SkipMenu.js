import styled from "styled-components";
import { useDispatch } from "react-redux";

import { ReactComponent as SkipArrow } from "../../assets/icon/SkipArrow.svg";
import { setMode } from "../../redux/screenModeSlice";

export default function SkipMenu() {
  const dispatch = useDispatch();

  const handleStageZeroSkip = () => {
    dispatch(setMode("StageSelection"));
  };

  return <SkipButton onClick={handleStageZeroSkip} />;
}

const SkipButton = styled(SkipArrow)`
  z-index: 999;
  position: absolute;
  bottom: 10vh;
  right: 5vw;
  cursor: pointer;
`;
