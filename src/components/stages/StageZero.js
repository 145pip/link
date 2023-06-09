import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";
import PropTypes from "prop-types";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import BackgroundMusic from "../music/BackgroundMusic";
import AutoSnap from "../../utils/AutoSnap";
import SkipMenu from "../menus/SkipMenu";
import usePath from "../../hooks/usePath";
import TutorialGuide from "../objects/TutorialGuide";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import { setDeparture, setArrival } from "../../redux/stageSlice";

export default function StageZero({
  isBGMOn,
  isSoundEffectOn,
  handleToggleBackgroundSoundButtonClick,
  handleToggleAllSoundsButtonClick,
}) {
  const dispatch = useDispatch();
  const [enableCameraRotation, setEnableCameraRotation] = useState(false);
  const coordinates = stageZeroCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const path = usePath(stageZeroCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageZeroCoordinates.departure));
    dispatch(setDeparture(stageZeroCoordinates.departure));
    dispatch(setArrival(stageZeroCoordinates.arrival));
  }, []);

  return (
    <>
      <Canvas>
        {enableCameraRotation ? (
          <OrthographicCamera
            makeDefault
            position={[50, 50, 50]}
            fov={50}
            near={0.01}
            far={1000}
            zoom={80}
          />
        ) : (
          <OrthographicCamera
            makeDefault
            position={[21.9, 55.38, 62.67]}
            rotation={[-0.736, 0.297, 0.259]}
            fov={50}
            near={0.01}
            far={1000}
            zoom={111.03706837330263}
          />
        )}
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
        {stageZeroCoordinates.cubes.positions.map(position => (
          <CubeElement
            key={position.id}
            position={position.coordinate}
            scale={0.5}
            color="indianred"
          />
        ))}
        <TutorialGuide
          position={[-5, 0, 1]}
          rotation={[1.5 * Math.PI, 0, 0]}
          scale={5}
          setEnableCameraRotation={setEnableCameraRotation}
        />

        <LocationPointer
          position={stageZeroCoordinates.arrival}
          color="yellow"
        />
        <LocationMarker
          position={stageZeroCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {stageZeroCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
            isSoundEffectOn={isSoundEffectOn}
          />
        ))}
        <Player
          position={stageZeroCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
          isSoundEffectOn={isSoundEffectOn}
        />
        {enableCameraRotation && <OrbitControls />}
      </Canvas>
      <BackgroundMusic
        isBGMOn={isBGMOn}
        isSoundEffectOn={isSoundEffectOn}
        handleToggleBackgroundSoundButtonClick={
          handleToggleBackgroundSoundButtonClick
        }
        handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
      />
      <SkipMenu />
    </>
  );
}

StageZero.propTypes = {
  isBGMOn: PropTypes.bool.isRequired,
  isSoundEffectOn: PropTypes.bool.isRequired,
  handleToggleBackgroundSoundButtonClick: PropTypes.func.isRequired,
  handleToggleAllSoundsButtonClick: PropTypes.func.isRequired,
};
