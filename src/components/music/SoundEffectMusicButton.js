import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as OffEqualizer } from "../../assets/icon/offEqualizer.svg";
import { ReactComponent as OnEqualizer } from "../../assets/icon/onEqualizer.svg";

export default function SoundEffectMusicButton({
  isSoundEffectOn,
  handleToggleAllSoundsButtonClick,
}) {
  return isSoundEffectOn ? (
    <SoundEffectOnButton
      type="button"
      onClick={handleToggleAllSoundsButtonClick}
    />
  ) : (
    <SoundEffecOffButton
      type="button"
      onClick={handleToggleAllSoundsButtonClick}
    />
  );
}

const SoundEffectOnButton = styled(OnEqualizer)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 9.5vh;
  right: 10vw;
`;

const SoundEffecOffButton = styled(OffEqualizer)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 9.5vh;
  right: 10vw;
`;

SoundEffectMusicButton.propTypes = {
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
