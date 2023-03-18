import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import stageThreeCoordinates from "../../data/stageThreeCoordinates.json";
import Cube from "../objects/Cube";

export default function StageThree() {
  return (
      <Canvas
        camera={{
          position: [15, 15, 15],
          near: 0.01,
          far: 1000,
          fov: 50,
          zoom: 2,
        }}
      >
        <ambientLight />
        <pointLight position={[-10, -10, -10]} />
        <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
        <Physics>
          {stageThreeCoordinates.cubes.positions.map((position, index) => (
            <Cube key={`stage1-cube-${index + 1}`} position={position} />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
  );
}
