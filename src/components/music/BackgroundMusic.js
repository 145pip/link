import { useEffect, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";

import stageZeroBGM from "../../assets/music/stageZeroBGM.mp3";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as SoundOff } from "../../assets/icon/SoundOff.svg";

export default function BackgroundMusic() {
  const [isMusicOn, setIsMusicOn] = useState(true);
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

  const handleToggleSoundButtonClick = () => {
    setIsMusicOn(prevState => !prevState);
  };

  useEffect(() => {
    musicPlay();
  }, [sound]);

  useEffect(() => {
    if (!isMusicOn) {
      sound.play();
    } else {
      sound.pause();
    }

    return () => {
      sound.pause();
    };
  }, [isMusicOn, sound]);

  return isMusicOn ? (
    <SoundOnButton onClick={handleToggleSoundButtonClick} />
  ) : (
    <SoundOffButton onClick={handleToggleSoundButtonClick} />
  );
}

const SoundOnButton = styled(Sound)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 7.5vh;
  right: 2vw;
`;

const SoundOffButton = styled(SoundOff)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 7.5vh;
  right: 2vw;
`;
