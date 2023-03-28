import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";
import PropTypes from "prop-types";

import stageOneCoordinates from "../../data/stageOneCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import Starfish from "../objects/Starfish";
import StarfishOnSand from "../objects/StarfishOnSand";
import StageGuide from "../objects/StageGuide";
import usePath from "../../hooks/usePath";
import AutoSnap from "../../utils/AutoSnap";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import { setDeparture, setArrival } from "../../redux/stageSlice";

export default function StageOne({
  isBGMOn,
  isSoundEffectOn,
  handleToggleBackgroundSoundButtonClick,
  handleToggleAllSoundsButtonClick,
}) {
  const dispatch = useDispatch();
  const coordinates = stageOneCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const path = usePath(stageOneCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageOneCoordinates.departure));
    dispatch(setDeparture(stageOneCoordinates.departure));
    dispatch(setArrival(stageOneCoordinates.arrival));
  }, []);

  return (
    <>
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[0, 50, 0]}
          fov={50}
          near={0.01}
          far={1000}
          zoom={80}
          rotation={[0, 0, 0]}
        />
        <color attach="background" args={["#7478d1"]} />
        <ambientLight />
        <pointLight position={[10, 10, 0]} castShadow />
        <pointLight position={[10, 10, -10]} castShadow />
        <pointLight position={[-10, 0, 10]} castshadow />
        <ContactShadows
          resolution={512}
          position={[0, -0.6, 0]}
          opacity={1}
          scale={10}
          blur={2}
          far={0.8}
        />
        {stageOneCoordinates.cubes.positions.map(position => (
          <CubeElement
            key={position.id}
            position={position.coordinate}
            scale={0.5}
            color="#fda10b"
          />
        ))}
        <Player
          position={stageOneCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
        />
        <StarfishOnSand position={[4, 8.1, 4]} scale={0.18} />
        <Starfish position={[-4.7, 0.1, 2.4]} scale={0.5} />
        <StageGuide
          position={[-5, 0, 0]}
          rotation={[1.5 * Math.PI, 0, 0]}
          scale={[8, 6, 0.1]}
        />
        <LocationPointer position={stageOneCoordinates.arrival} color="navy" />
        <LocationMarker
          position={stageOneCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {stageOneCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <GameMenu />
      <BackgroundMusic
        isBGMOn={isBGMOn}
        isSoundEffectOn={isSoundEffectOn}
        handleToggleBackgroundSoundButtonClick={
          handleToggleBackgroundSoundButtonClick
        }
        handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
      />
    </>
  );
}

StageOne.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
