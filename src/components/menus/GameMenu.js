import styled, { css } from "styled-components";
import React, { useState } from "react";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";
import ResetModal from "../modals/ResetModal";
import StageSelectModal from "../modals/StageSelectModal";

export default function GameMenu() {
  const [reset, setReset] = useState(false);
  const [selectStage, setSelectStage] = useState(false);

  const handleReset = () => {
    setReset(true);
  };
  const handleStageSelection = () => {
    setSelectStage(true);
  };

  return (
    <>
      <ResetButton onClick={handleReset} />
      <StageSelectionButton onClick={handleStageSelection} />
      <SoundControlButton />
      {(reset && <ResetModal />) || (selectStage && <StageSelectModal />)}
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
