import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";

import stageTwoCoordinates from "../../data/stageTwoCoordinates.json";
import CubeElement from "../objects/CubeElement";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";
import Player from "../objects/Player";
import usePath from "../../hooks/usePath";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import AutoSnap from "../../utils/AutoSnap";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import LinkEdge from "../objects/LinkEdge";

export default function StageTwo() {
  const dispatch = useDispatch();
  const coordinates = stageTwoCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const path = usePath(stageTwoCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageTwoCoordinates.departure));
  }, []);

  return (
    <>
      <BackgroundMusic />
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[50, 50, 50]}
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
        {/* <Axis /> */}
        {stageTwoCoordinates.cubes.positions.map(position => (
          <CubeElement
            key={position.id}
            position={position.coordinate}
            scale={0.5}
            color="indianred"
          />
        ))}
        {stageTwoCoordinates.linkEdges.map(linkEdge => (
          <LinkEdge key={linkEdge.key} linkEdge={linkEdge} />
        ))}

        <LocationPointer position={[4, 5.5, 3]} color="yellow" />
        <LocationMarker position={[4, 5, 3]} rotation={[1.5 * Math.PI, 0, 0]} />
        {stageTwoCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
          />
        ))}
        <Player
          position={stageTwoCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
        />
        <OrbitControls />
      </Canvas>
      <GameMenu />
    </>
  );
}
