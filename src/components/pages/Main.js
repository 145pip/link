import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";

import Cube from "../objects/Cube";
import mainCoordinates from "../../data/mainCoordinates.json";

export default function Main() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[0, 15, 20]} />
      <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
      <OrthographicCamera
        makeDefault
        position={[-6, 6, 20]}
        fov={40}
        near={0.04}
        far={1000}
        zoom={40}
      />
      <Physics>
        {mainCoordinates.cubes.positions.map((position, index) => (
          <Cube key={`stage0-cube-${index + 1}`} position={position} />
        ))}
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}
