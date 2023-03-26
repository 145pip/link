import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import AutoSnap from "../../utils/AutoSnap";
import SkipMenu from "../menus/SkipMenu";
import usePath from "../../hooks/usePath";
import TutorialGuide from "../objects/TutorialGuide";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";

export default function StageZero() {
  const [enableMouseRotation, setEnableMouseRotation] = useState(false);

  const dispatch = useDispatch();
  const coordinates = stageZeroCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const path = usePath(stageZeroCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageZeroCoordinates.departure));
  }, []);

  return (
    <>
      <Canvas>
        {enableMouseRotation ? (
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
          setEnableMouseRotation={setEnableMouseRotation}
        />

        <LocationPointer position={[0, 5.5, 0]} color="yellow" />
        <LocationMarker position={[0, 5, 0]} rotation={[1.5 * Math.PI, 0, 0]} />
        {stageZeroCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
          />
        ))}
        <Player
          position={stageZeroCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
        />
        {enableMouseRotation && <OrbitControls />}
      </Canvas>
      <SkipMenu />
    </>
  );
}
