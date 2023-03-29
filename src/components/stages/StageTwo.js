import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";
import PropTypes from "prop-types";

import stageTwoCoordinates from "../../data/stageTwoCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import Starfish from "../objects/Starfish";
import StarfishOnSand from "../objects/StarfishOnSand";
import SeaUrchin from "../objects/SeaUrchin";
import Turtle from "../objects/Turtle";
import StageGuide from "../objects/StageGuide";
import usePath from "../../hooks/usePath";
import AutoSnap from "../../utils/AutoSnap";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import { setDeparture, setArrival } from "../../redux/stageSlice";

export default function StageTwo({
  isBGMOn,
  isSoundEffectOn,
  handleToggleBackgroundSoundButtonClick,
  handleToggleAllSoundsButtonClick,
}) {
  const dispatch = useDispatch();
  const [isHiddenCubesVisible, setIsHiddenCubesVisible] = useState(false);
  const currentCoordinates = useSelector(
    state => state.currentCoordinates.coordinates
  );
  const coordinates = isHiddenCubesVisible
    ? stageTwoCoordinates.cubes.positions.map(position => position.coordinate)
    : stageTwoCoordinates.cubes.positions.map(position => position.coordinate);
  const path = usePath(stageTwoCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageTwoCoordinates.departure));
    dispatch(setDeparture(stageTwoCoordinates.departure));
    dispatch(setArrival(stageTwoCoordinates.arrival));
  }, []);

  useEffect(() => {
    if (
      isHiddenCubesVisible === false &&
      currentCoordinates?.[0] === 2 &&
      currentCoordinates?.[1] === 0.5 &&
      currentCoordinates?.[2] === 0
    ) {
      setTimeout(() => {
        setIsHiddenCubesVisible(true);
      }, 1000);
    }
  }, [currentCoordinates]);

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
        {stageTwoCoordinates.cubes.positions.map(position => (
          <CubeElement
            key={position.id}
            position={position.coordinate}
            scale={0.5}
            color="#03a9f4"
          />
        ))}
        {isHiddenCubesVisible &&
          stageTwoCoordinates.hiddenCubes.positions.map(position => (
            <CubeElement
              key={position.id}
              position={position.coordinate}
              scale={0.5}
              color="#03a9f4"
            />
          ))}
        <Player
          position={stageTwoCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
          isSoundEffectOn={isSoundEffectOn}
        />
        <StarfishOnSand position={[1, 2.1, 1]} scale={0.18} />
        <Starfish position={[-5.3, 0.1, 2]} scale={0.2} />
        <SeaUrchin position={[1, 2.4, 0]} scale={8} />
        <SeaUrchin position={[-5.3, 0.4, 3.1]} scale={8} />
        <Turtle position={[4.5, 2.9, 1.3]} rotation={[0, 0, 0]} scale={1} />
        <Turtle
          position={[-7.3, 0.8, 3.1]}
          rotation={[0, 0.5 * Math.PI, 0]}
          scale={1}
        />
        <StageGuide
          position={[-5, 0, 0]}
          rotation={[1.5 * Math.PI, 0, 0]}
          scale={[8, 6, 0.1]}
        />
        <LocationPointer
          position={stageTwoCoordinates.arrival}
          color="indianred"
        />
        <LocationMarker
          position={stageTwoCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        <LocationMarker
          position={[2, 0.5, 0]}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {isHiddenCubesVisible &&
          stageTwoCoordinates.linkEdges.map(linkEdge => (
            <AutoSnap
              key={linkEdge.id}
              linkSensitivity={0.05}
              linkEdge={linkEdge}
              isSoundEffectOn={isSoundEffectOn}
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

StageTwo.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
