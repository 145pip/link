import * as THREE from "three";

import backgroundMusic from "../../assets/music/backgroundmusic.mp3";

export default function BackgroundMusic() {
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(backgroundMusic, buffer => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.2);
    sound.play();
  });
}
