import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";
import { setMode } from "../../redux/screenModeSlice";

export default function GameMenu() {
  const dispatch = useDispatch();

  const selectStage = () => {
    dispatch(setMode("StageSelection"));
  };

  return (
    <>
      <StyledReload />
      <StyledStageSelection onClick={selectStage} />
      <StyledSound />
    </>
  );
}

const commonStyles = css`
  z-index: 999;
  position: absolute;
  top: 8vh;
  cursor: pointer;
`;

const StyledReload = styled(Reload)`
  ${commonStyles};
  right: 13vw;
`;

const StyledSound = styled(Sound)`
  ${commonStyles};
  right: 2vw;
  top: 7.5vh;
`;

const StyledStageSelection = styled(StageSelection)`
  right: 8vw;
  ${commonStyles};
`;
