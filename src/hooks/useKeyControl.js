import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentCoordinates } from "../redux/currentCoordinatesSlice";
import { PLAYER_MOTIONS, PLAYER_HEIGHT } from "../utils/constants";

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
  setPlayerRotation
) {
  const dispatch = useDispatch();
  const [rotationCount, setRotationCount] = useState(0);
  const currentCoordinates = useSelector(
    state => state.currentCoordinates.coordinates
  );
  const isLink = useSelector(state => state.edgeLink.isLinked);
  const edgeFromCoordinates = useSelector(
    state => state.edgeLink.edgeFromCoordinates
  );
  const edgeToCoordinates = useSelector(
    state => state.edgeLink.edgeToCoordinates
  );

  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  const movePlayer = direction => {
    const currentDirection = HEAD_DIRECTION[rotationCount % 4];
    const nextPlayerPosition = [
      playerPosition[0] + direction * currentDirection.x,
      playerPosition[1],
      playerPosition[2] + direction * currentDirection.z,
    ];
    let nextCoordinates = [
      nextPlayerPosition[0],
      nextPlayerPosition[1] - PLAYER_HEIGHT,
      nextPlayerPosition[2],
    ];

    if (
      isLink &&
      currentCoordinates.every(
        (coordinate, index) => edgeToCoordinates[index] === coordinate
      )
    ) {
      nextCoordinates = edgeFromCoordinates;
    }

    if (!path.isAdjacent(currentCoordinates, nextCoordinates)) {
      setMotionIndex(PLAYER_MOTIONS.STANDING);
      return;
    }

    const duration = 240;
    const steps = Math.round(duration / 13);

    setMotionIndex(PLAYER_MOTIONS.WALKING);
    setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 500);

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const t = i / steps;
        setPlayerPosition([
          lerp(playerPosition[0], nextPlayerPosition[0], t),
          playerPosition[1],
          lerp(playerPosition[2], nextPlayerPosition[2], t),
        ]);
      }, i * 25);
    }

    dispatch(setCurrentCoordinates(nextCoordinates));
  };

  const rotatePlayer = direction => {
    setMotionIndex(PLAYER_MOTIONS.WALKING);
    setRotationCount(previousCount => previousCount + (direction > 0 ? 1 : 3));
    setTimeout(() => setMotionIndex(PLAYER_MOTIONS.STANDING), 180);

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
    if (KEY_EVENT.UP.includes(event.code)) {
      movePlayer(1);
    } else if (KEY_EVENT.DOWN.includes(event.code)) {
      movePlayer(-1);
    } else if (KEY_EVENT.LEFT.includes(event.code)) {
      rotatePlayer(1);
    } else if (KEY_EVENT.RIGHT.includes(event.code)) {
      rotatePlayer(-1);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [rotationCount, playerPosition]);
}
