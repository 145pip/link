import { useState, useEffect } from "react";

import throttle from "./throttle";

const MOVEMENT_INCREMENT = 0.05;
const ROTATION_INCREMENT = (5 * Math.PI) / 180;
const KEYBOARD_EVENT_CODE = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
};

export default function playerObjectKeyControl(
  playerMotions,
  setMotionIndex,
  setPlayerObjectPosition,
  setPlayerObjectRotation
) {
  const [rotationCount, setRotationCount] = useState(0);

  const playerObjectHeadDirections = [
    { x: 0, z: 1 },
    { x: 1, z: 0 },
    { x: 0, z: -1 },
    { x: -1, z: 0 },
  ];

  useEffect(() => {
    const handleKeyDown = throttle(event => {
      if (event.code === KEYBOARD_EVENT_CODE.ARROW_UP) {
        setMotionIndex(playerMotions.walking);
        setTimeout(() => setMotionIndex(playerMotions.standing), 500);

        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0] +
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].x,
              position[1],
              position[2] +
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].z,
            ]);
          }, i * 25);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_DOWN) {
        setMotionIndex(playerMotions.walking);
        setTimeout(() => setMotionIndex(playerMotions.standing), 500);

        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0] -
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].x,
              position[1],
              position[2] -
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].z,
            ]);
          }, i * 25);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_LEFT) {
        setMotionIndex(playerMotions.walking);
        setRotationCount(previousCount => previousCount + 1);
        setTimeout(() => setMotionIndex(1), 180);

        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(rotation => [
              rotation[0],
              rotation[1] + ROTATION_INCREMENT,
              rotation[2],
            ]);
          }, i * 10);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_RIGHT) {
        setMotionIndex(playerMotions.walking);
        setRotationCount(previousCount => previousCount + 3);
        setTimeout(() => setMotionIndex(1), 180);

        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(rotation => [
              rotation[0],
              rotation[1] - ROTATION_INCREMENT,
              rotation[2],
            ]);
          }, i * 10);
        }
      } else if (event.code === "KeyZ") {
        setMotionIndex(playerMotions.crouching);

        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0],
              position[1] - 0.05,
              position[2],
            ]);
          }, i * 50);
        }
      } else if (event.code === "KeyX") {
        setMotionIndex(playerMotions.crouching);
        setTimeout(() => setMotionIndex(playerMotions.standing), 1500);

        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0],
              position[1] + 0.05,
              position[2],
            ]);
          }, i * 50);
        }
      }
    }, 180);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rotationCount]);
}
