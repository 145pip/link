import * as THREE from "three";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentCoordinates } from "../redux/currentCoordinatesSlice";
import singleStepSound from "../assets/music/singleStepSound.mp3";
import crouchingSound from "../assets/music/crouchingSound.mp3";
import { PLAYER_MOTIONS, PLAYER_HEIGHT } from "../utils/constants";
import { setLevelUp } from "../redux/stageSlice";
import { setInit } from "../redux/edgeLinkSlice";

const ROTATION_INCREMENT = (5 * Math.PI) / 180;
const KEY_EVENT = {
  UP: ["ArrowUp", "KeyW"],
  DOWN: ["ArrowDown", "KeyS"],
  LEFT: ["ArrowLeft", "KeyA"],
  RIGHT: ["ArrowRight", "KeyD"],
};
const HEAD_DIRECTION = [
  { x: 0, z: 1 },
  { x: 1, z: 0 },
  { x: 0, z: -1 },
  { x: -1, z: 0 },
];

export default function useKeyControl(
  path,
  playerPosition,
  setMotionIndex,
  setPlayerPosition,
  setPlayerRotation,
  isSoundEffectOn
) {
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const arrival = useSelector(state => state.stage.arrival);
  const [rotationCount, setRotationCount] = useState(0);
  const listener = new THREE.AudioListener();
  const audioLoader = new THREE.AudioLoader();
  const currentCoordinates = useSelector(
    state => state.currentCoordinates.coordinates
  );
  const isLinked = useSelector(state => state.edgeLink.isLinked);
  const linkEdge = useSelector(state => state.edgeLink.linkEdge);
  const edgeFromCoordinates = useSelector(
    state => state.edgeLink.edgeFromCoordinates
  );
  const edgeToCoordinates = useSelector(
    state => state.edgeLink.edgeToCoordinates
  );

  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  const singleFootStep = () => {
    audioLoader.load(singleStepSound, buffer => {
      const sound = new THREE.Audio(listener);
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.3);
      sound.play();
    });
  };

  const crouchingSoundEffect = () => {
    audioLoader.load(crouchingSound, buffer => {
      const sound = new THREE.Audio(listener);
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.2);
      sound.play();
    });
  };

  const crouchPlayer = trigger => {
    const duration = 1000;
    const steps = Math.round(duration / 40);

    setMotionIndex(PLAYER_MOTIONS.CROUCHING);
    let y;

    if (isSoundEffectOn) {
      crouchingSoundEffect();
    }

    if (trigger === "start") {
      setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 1100);
      y = playerPosition[1] + PLAYER_HEIGHT;
    } else {
      setTimeout(() => setIsFinished(true), 2000);
      y = playerPosition[1] - 1.5;
    }

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const t = i / steps;
        setPlayerPosition([
          playerPosition[0],
          lerp(playerPosition[1], y, t),
          playerPosition[2],
        ]);
      }, i * 50);
    }
  };

  const movePlayer = direction => {
    const currentDirection = HEAD_DIRECTION[rotationCount % 4];

    let nextPlayerPosition = [
      playerPosition[0] + direction * currentDirection.x,
      playerPosition[1],
      playerPosition[2] + direction * currentDirection.z,
    ];
    let nextCoordinates = [
      nextPlayerPosition[0],
      nextPlayerPosition[1] - PLAYER_HEIGHT,
      nextPlayerPosition[2],
    ];

    if (path.isAdjacent(currentCoordinates, nextCoordinates)) {
      const duration = 240;
      const steps = Math.round(duration / 13);

      setMotionIndex(PLAYER_MOTIONS.WALKING);
      setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 500);

      if (isSoundEffectOn) {
        singleFootStep();
      }

      Array.from({ length: steps + 1 }).forEach((_, i) => {
        setTimeout(() => {
          const t = i / steps;
          setPlayerPosition([
            lerp(playerPosition[0], nextPlayerPosition[0], t),
            lerp(playerPosition[1], nextPlayerPosition[1], t),
            lerp(playerPosition[2], nextPlayerPosition[2], t),
          ]);
        }, i * 25);
      });

      dispatch(setCurrentCoordinates(nextCoordinates));
    } else if (isLinked) {
      const isEdgeFromCoord = currentCoordinates.every(
        (coord, index) => coord === edgeFromCoordinates[index]
      );
      const isEdgeToCoord = currentCoordinates.every(
        (coord, index) => coord === edgeToCoordinates[index]
      );

      if (!isEdgeFromCoord && !isEdgeToCoord) {
        return;
      }

      const { edgeFrom, edgeTo } = linkEdge;
      const { pointA: edgeFromPointA, pointB: edgeFromPointB } = edgeFrom;
      const { pointA: edgeToPointA } = edgeTo;

      const axis = edgeFromPointA[0] === edgeFromPointB[0] ? "x" : "z";
      const index = axis === "x" ? 0 : 2;

      if (isEdgeFromCoord) {
        if (
          (currentDirection[axis] === 1 &&
            edgeFromPointA[index] > currentCoordinates[index]) ||
          (currentDirection[axis] === -1 &&
            edgeFromPointA[index] < currentCoordinates[index])
        ) {
          nextCoordinates = edgeToCoordinates;
          nextPlayerPosition = [
            edgeToCoordinates[0],
            edgeToCoordinates[1] + PLAYER_HEIGHT,
            edgeToCoordinates[2],
          ];

          const duration = 240;
          const steps = Math.round(duration / 13);

          setMotionIndex(PLAYER_MOTIONS.WALKING);
          setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 500);

          if (isSoundEffectOn) {
            singleFootStep();
          }

          Array.from({ length: steps + 1 }).forEach((_, i) => {
            setTimeout(() => {
              const t = i / steps;
              setPlayerPosition([
                lerp(playerPosition[0], nextPlayerPosition[0], t),
                lerp(playerPosition[1], nextPlayerPosition[1], t),
                lerp(playerPosition[2], nextPlayerPosition[2], t),
              ]);
            }, i * 25);
          });

          dispatch(setCurrentCoordinates(nextCoordinates));
        }
      }

      if (isEdgeToCoord) {
        if (
          (currentDirection[axis] === 1 &&
            edgeToPointA[index] > currentCoordinates[index]) ||
          (currentDirection[axis] === -1 &&
            edgeToPointA[index] < currentCoordinates[index])
        ) {
          nextCoordinates = edgeFromCoordinates;
          nextPlayerPosition = [
            edgeFromCoordinates[0],
            edgeFromCoordinates[1] + PLAYER_HEIGHT,
            edgeFromCoordinates[2],
          ];

          const duration = 240;
          const steps = Math.round(duration / 13);

          setMotionIndex(PLAYER_MOTIONS.WALKING);
          setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 500);

          if (isSoundEffectOn) {
            singleFootStep();
          }

          Array.from({ length: steps + 1 }).forEach((_, i) => {
            setTimeout(() => {
              const t = i / steps;
              setPlayerPosition([
                lerp(playerPosition[0], nextPlayerPosition[0], t),
                lerp(playerPosition[1], nextPlayerPosition[1], t),
                lerp(playerPosition[2], nextPlayerPosition[2], t),
              ]);
            }, i * 25);
          });

          dispatch(setCurrentCoordinates(nextCoordinates));
        }
      }

      setMotionIndex(PLAYER_MOTIONS.STANDING);
    } else {
      setMotionIndex(PLAYER_MOTIONS.STANDING);
    }
  };

  const rotatePlayer = direction => {
    setMotionIndex(PLAYER_MOTIONS.WALKING);
    setRotationCount(previousCount => previousCount + (direction > 0 ? 1 : 3));

    setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 180);

    if (isSoundEffectOn) {
      singleFootStep();
    }

    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        setPlayerRotation(rotation => [
          rotation[0],
          rotation[1] + direction * ROTATION_INCREMENT,
          rotation[2],
        ]);
      }, i * 10);
    }
  };

  const handleKeyUp = event => {
    const keyActionMap = {
      UP: () => movePlayer(1),
      DOWN: () => movePlayer(-1),
      LEFT: () => rotatePlayer(1),
      RIGHT: () => rotatePlayer(-1),
    };

    const action = Object.keys(KEY_EVENT).find(key =>
      KEY_EVENT[key].includes(event.code)
    );

    if (action) {
      keyActionMap[action]();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [rotationCount, playerPosition, isSoundEffectOn]);

  useEffect(() => {
    crouchPlayer("start");
  }, []);

  useEffect(() => {
    if (isFinished) {
      dispatch(setLevelUp());
      dispatch(setCurrentCoordinates(null));
      dispatch(setInit());
    }
  }, [isFinished]);

  useEffect(() => {
    if (
      playerPosition.every((coord, index) => {
        if (index === 1) return coord === arrival[index] + PLAYER_HEIGHT;

        return coord === arrival[index];
      })
    ) {
      crouchPlayer("finish");
    }
  }, [playerPosition]);
}
