import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import stageOneCoordinates from "../../data/stageOneCoordinates.json";
import Cube from "../objects/Cube";
import GameMenu from "../menus/GameMenu";
import BackgroundMusicSetting from "../music/BackgroundMusicSetting";

export default function StageOne() {
  return (
    <>
      <BackgroundMusicSetting />
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
          {stageOneCoordinates.cubes.positions.map(position => (
            <Cube key={position.id} position={position.coordinate} />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
      <GameMenu />
    </>
  );
}
