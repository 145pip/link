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
import Hedgehog from "../objects/Hedgehog";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import usePath from "../../hooks/usePath";
import LinkEdge from "../objects/LinkEdge";
import AutoSnap from "../../utils/AutoSnap";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";

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
  }, []);

  return (
    <>
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[-50, 50, 50]}
          fov={50}
          near={0.01}
          far={1000}
          zoom={80}
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
        <Hedgehog position={[4, 8.4, 4]} scale={8} />
        <LocationPointer position={stageOneCoordinates.arrival} color="navy" />
        <LocationMarker
          position={stageOneCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {stageOneCoordinates.linkEdges.map(linkEdge => (
          <LinkEdge key={linkEdge.key} linkEdge={linkEdge} />
        ))}
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
