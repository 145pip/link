import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import StageControlBoxSurface from "./StageControlBoxSurface";

export default function StageControlBox() {
  const ref = useRef();

  useFrame(state => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = 0.2 + 0.1 * Math.sin(t * 1.5);
    ref.current.rotation.x = 0.3 * Math.sin(0.1 * t);
    ref.current.rotation.y = 0.3 * t;
    ref.current.rotation.z = 0.3 * Math.sin(t);
  });

  return (
    <group ref={ref}>
      <Physics>
        <StageControlBoxSurface
          args={[1, 1]}
          position={[0, 0.5, 0]}
          level={0}
          rotation={[-Math.PI / 2, 0, 0]}
          defaultImage="/assets/image/stage0-default.png"
          hoverImage="/assets/image/stage0-selected.png"
        />
        <StageControlBoxSurface
          args={[1, 1]}
          position={[0, 0, 0.5]}
          level={1}
          defaultImage="/assets/image/stage1-default.png"
          hoverImage="/assets/image/stage1-selected.png"
        />
        <StageControlBoxSurface
          args={[1, 1]}
          position={[0.5, 0, 0]}
          level={2}
          rotation={[0, Math.PI / 2, 0]}
          defaultImage="/assets/image/stage2-default.png"
          hoverImage="/assets/image/stage2-selected.png"
        />
        <StageControlBoxSurface
          args={[1, 1]}
          position={[0, 0, -0.5]}
          level={3}
          rotation={[0, Math.PI, 0]}
          defaultImage="/assets/image/stage3-default.png"
          hoverImage="/assets/image/stage3-selected.png"
        />
        <StageControlBoxSurface
          args={[1, 1]}
          position={[-0.5, 0, 0]}
          level={4}
          rotation={[0, -Math.PI / 2, 0]}
          defaultImage="/assets/image/stage4-default.png"
          hoverImage="/assets/image/stage4-selected.png"
        />
        <StageControlBoxSurface
          args={[1, 1]}
          position={[0, -0.5, 0]}
          level={5}
          rotation={[Math.PI / 2, 0, 0]}
          defaultImage="/assets/image/stage5-default.png"
          hoverImage="/assets/image/stage5-selected.png"
        />
      </Physics>
    </group>
  );
}
