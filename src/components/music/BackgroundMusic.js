import React from "react";
import PropTypes from "prop-types";

import BgmSoundButton from "./BgmSoundButton";
import SoundEffectMusicButton from "./SoundEffectMusicButton";

export default function BackgroundMusic({
  isBGMOn,
  isSoundEffectOn,
  handleToggleBackgroundSoundButtonClick,
  handleToggleAllSoundsButtonClick,
}) {
  return (
    <>
      <BgmSoundButton
        isBGMOn={isBGMOn}
        handleToggleBackgroundSoundButtonClick={
          handleToggleBackgroundSoundButtonClick
        }
      />
      <SoundEffectMusicButton
        isSoundEffectOn={isSoundEffectOn}
        handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
      />
    </>
  );
}

BackgroundMusic.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
