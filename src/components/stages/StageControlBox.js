import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import StageControlBoxSurface from "./StageControlBoxSurface";

export default function StageControlBox() {
  const ref = useRef();

  useFrame(state => {
    const timeCounter = state.clock.getElapsedTime();
    ref.current.position.y = 0.2 + 0.1 * Math.sin(timeCounter * 1.5);
    ref.current.rotation.x = 0.3 * Math.sin(0.1 * timeCounter);
    ref.current.rotation.y = 0.3 * timeCounter;
    ref.current.rotation.z = 0.3 * Math.sin(timeCounter);
  });

  const currentLevel = localStorage.getItem("stageLevel")
    ? parseInt(localStorage.getItem("stageLevel"), 10)
    : 0;

  const createStageControlBoxSurface = (level, position, rotation) => {
    const defaultImage =
      currentLevel < level
        ? `/assets/image/stage-selection/stage${level}-locked.png`
        : `/assets/image/stage-selection/stage${level}-default.png`;

    const hoverImage = `/assets/image/stage-selection/stage${level}-selected.png`;

    return (
      <StageControlBoxSurface
        args={[1, 1]}
        position={position}
        level={level}
        rotation={rotation}
        defaultImage={defaultImage}
        hoverImage={hoverImage}
      />
    );
  };

  return (
    <group ref={ref}>
      <Physics>
        {createStageControlBoxSurface(0, [0, 0.5, 0], [-Math.PI / 2, 0, 0])}
        {createStageControlBoxSurface(1, [0, 0, 0.5])}
        {createStageControlBoxSurface(2, [0.5, 0, 0], [0, Math.PI / 2, 0])}
        {createStageControlBoxSurface(3, [0, 0, -0.5], [0, Math.PI, 0])}
        {createStageControlBoxSurface(4, [-0.5, 0, 0], [0, -Math.PI / 2, 0])}
        {createStageControlBoxSurface(5, [0, -0.5, 0], [Math.PI / 2, 0, 0])}
      </Physics>
    </group>
  );
}
