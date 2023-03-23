import * as THREE from "three";
import { useEffect, useState } from "react";
import styled from "styled-components";

import backgroundMusic from "../../assets/music/backgroundmusic.mp3";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";

export default function BackgroundMusicSetting() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  const musicPlay = () => {
    audioLoader.load(backgroundMusic, buffer => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      sound.play();
    });
  };

  const handleToggleSoundButtonClick = () => {
    if (!isMusicPlaying) {
      setIsMusicPlaying(true);
    } else {
      setIsMusicPlaying(false);
    }
  };

  useEffect(() => {
    musicPlay();
  }, [sound]);

  useEffect(() => {
    if (!isMusicPlaying) {
      sound.play();
    } else {
      sound.pause();
    }

    return () => {
      sound.pause();
    };
  }, [isMusicPlaying, sound]);

  return <SoundControlButton onClick={handleToggleSoundButtonClick} />;
}

const SoundControlButton = styled(Sound)`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 7.5vh;
  right: 2vw;
`;
