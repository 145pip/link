import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import styled from "styled-components";

import Cube from "../objects/Cube";
import mainCoordinates from "../../data/mainCoordinates.json";

export default function Main() {
  return (
    <>
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
          {mainCoordinates.cubes.positions.map(position => (
            <Cube key={`main-cube-${position}`} position={position} />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
      <Button type="button">START GAME</Button>
    </>
  );
}

const Button = styled.button`
  width: 20vw;
  height: 10vh;
  position: absolute;
  top: 70vh;
  left: 40vw;
  font-size: 20px;
  background-color: rgba(51, 153, 255, 20%);
  color: black;
  border: none;
  z-index: 999;
`;
