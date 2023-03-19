import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";
import { setMode } from "../../redux/screenModeSlice";

export default function GameMenu() {
  const dispatch = useDispatch();

  const handleStageSelection = () => {
    dispatch(setMode("StageSelection"));
  };

  return (
    <>
      <ResetButton />
      <StageSelectionButton onClick={handleStageSelection} />
      <SoundControlButton />
    </>
  );
}

const commonStyles = css`
  z-index: 999;
  position: absolute;
  top: 8vh;
  cursor: pointer;
`;

const ResetButton = styled(Reload)`
  ${commonStyles};
  right: 13vw;
`;

const SoundControlButton = styled(Sound)`
  ${commonStyles};
  right: 2vw;
  top: 7.5vh;
`;

const StageSelectionButton = styled(StageSelection)`
  right: 8vw;
  ${commonStyles};
`;
