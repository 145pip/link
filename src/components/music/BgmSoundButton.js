import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as THREE from "three";

import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as SoundOff } from "../../assets/icon/SoundOff.svg";
import stageZeroBGM from "../../assets/music/stageZeroBGM.mp3";

export default function BgmSoundButton({
  isBGMOn,
  handleToggleBackgroundSoundButtonClick,
}) {
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  const musicPlay = () => {
    audioLoader.load(stageZeroBGM, buffer => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      sound.play();
    });
  };

  useEffect(() => {
    musicPlay();
  }, []);

  useEffect(() => {
    if (isBGMOn) {
      musicPlay();
    } else {
      sound.pause();
    }

    return () => {
      sound.pause();
    };
  }, [isBGMOn]);

  return isBGMOn ? (
    <BgSoundOnButton
      type="button"
      onClick={handleToggleBackgroundSoundButtonClick}
    />
  ) : (
    <BgSoundOffButton
      type="button"
      onClick={handleToggleBackgroundSoundButtonClick}
    />
  );
}

const BgSoundOnButton = styled(Sound)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 7.7vh;
  right: 20vw;
`;

const BgSoundOffButton = styled(SoundOff)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 7.7vh;
  right: 20vw;
`;

BgmSoundButton.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
};
