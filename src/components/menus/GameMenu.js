import styled, { css } from "styled-components";
import React, { useState } from "react";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";
import Modal from "../modals/Modal";

export default function GameMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetButtonClick = () => {
    setIsModalOpen(true);
    setMessage("reset");
  };
  const handleStageSelectButtonClick = () => {
    setIsModalOpen(true);
    setMessage("stage");
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <Modal onClose={handleModalClose} message={message} />}
      <ResetButton onClick={handleResetButtonClick} />
      <StageSelectionButton onClick={handleStageSelectButtonClick} />
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
