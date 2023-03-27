import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import stageOneCoordinates from "../../data/stageOneCoordinates.json";
import Cube from "../objects/Cube";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";

export default function StageOne({
  isBGMOn,
  isSoundEffectOn,
  handleToggleBackgroundSoundButtonClick,
  handleToggleAllSoundsButtonClick,
}) {
  return (
    <>
      <BackgroundMusic
        isBGMOn={isBGMOn}
        isSoundEffectOn={isSoundEffectOn}
        handleToggleBackgroundSoundButtonClick={
          handleToggleBackgroundSoundButtonClick
        }
        handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
      />
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

StageOne.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
