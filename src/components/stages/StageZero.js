import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import Cube from "../objects/Cube";

export default function StageZero() {
  return (
    <Canvas
      camera={{
        position: [15, 15, 15],
        near: 0.01,
        far: 1000,
        fov: 50,
        zoom: 1,
      }}
    >
      <ambientLight />
      <pointLight position={[-10, -10, -10]} />
      <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
      <Physics>
        {stageZeroCoordinates.positions.map((coordinate, id) => (
          <Cube key={`stage0-cube-${id + 1}`} position={coordinate} />
        ))}
      </Physics>
      <OrbitControls enablePan />
    </Canvas>
  );
}
