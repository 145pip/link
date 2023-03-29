import React from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import styled from "styled-components";

import Cube from "../objects/Cube";
import mainCoordinates from "../../data/mainCoordinates.json";
import { setMode } from "../../redux/screenModeSlice";
import { SCREEN_MODE } from "../../utils/constants";

export default function Main() {
  const dispatch = useDispatch();

  const handleGameStart = () => {
    dispatch(setMode(SCREEN_MODE.GAME_STAGE));
  };

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
            <Cube key={position.id} position={position.coordinate} />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
      <GameStartButton type="button" onClick={handleGameStart}>
        START GAME
      </GameStartButton>
    </>
  );
}

const GameStartButton = styled.button`
  width: 20vw;
  height: 10vh;
  position: absolute;
  top: 70vh;
  left: 40vw;
  font-size: 20px;
  background-color: rgba(51, 153, 255, 20%);
  border-radius: 2%;
  color: black;
  border: none;
  z-index: 999;
  cursor: pointer;
`;
