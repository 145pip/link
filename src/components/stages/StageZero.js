import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import Cube from "../objects/Cube";
import AutoSnap from "../../utils/AutoSnap";
import SkipMenu from "../menus/SkipMenu";
import PlayerObject from "../objects/PlayerObject";

export default function StageZero() {
  const movementIncrement = 0.05;
  const rotationIncrement = (5 * Math.PI) / 180;
  const [playerObjectPosition, setPlayerObjectPosition] = useState([0, 1, 1]);
  const [playerObjectRotation, setPlayerObjectRotation] = useState([0, 0, 0]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === "ArrowUp") {
        setIsMoving(true);
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0],
              position[1],
              position[2] + movementIncrement,
            ]);
          }, i * 50);
        }
      } else if (event.code === "ArrowDown") {
        setIsMoving(false);
      } else if (event.code === "ArrowRight") {
        setIsMoving(false);
        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(position => [
              position[0],
              position[1] - rotationIncrement,
              position[2],
            ]);
          }, i * 25);
        }
      } else if (event.code === "ArrowLeft") {
        setIsMoving(false);
        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(position => [
              position[0],
              position[1] + rotationIncrement,
              position[2],
            ]);
          }, i * 25);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerObjectPosition]);

  return (
    <>
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
          {stageZeroCoordinates.cubes.positions.map(position => (
            <Cube
              key={`stage0-cube-${JSON.stringify(position)}`}
              position={position}
            />
          ))}
          {stageZeroCoordinates.linkEdges.map(linkEdge => (
            <AutoSnap
              key={`stage0-auto-snap-${JSON.stringify(linkEdge)}`}
              linkSensitivity={0.05}
              linkEdge={linkEdge}
            />
          ))}
        </Physics>
        <PlayerObject
          position={playerObjectPosition}
          rotation={playerObjectRotation}
          scale={2}
          isMoving={isMoving}
        />
        <OrbitControls />
      </Canvas>
      <SkipMenu />
    </>
  );
}
