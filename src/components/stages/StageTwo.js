import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";

import stageTwoCoordinates from "../../data/stageTwoCoordinates.json";
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
        {stageTwoCoordinates.cubes.positions.map(position => (
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
        />
        <Hedgehog position={[3, 5.4, 4]} scale={8} />
        <Hedgehog position={[4, 5.4, 3]} scale={8} />
        <Hedgehog position={[4, 5.4, 4]} scale={8} />
        <Hedgehog position={[4, 5.4, 5]} scale={8} />
        <Hedgehog position={[5, 5.4, 4]} scale={8} />
        <Hedgehog position={[3, 4.4, 5]} scale={8} />
        <LocationPointer
          position={stageTwoCoordinates.arrival}
          color="indianred"
        />
        <LocationMarker
          position={stageTwoCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {stageTwoCoordinates.linkEdges.map(linkEdge => (
          <LinkEdge key={linkEdge.key} linkEdge={linkEdge} />
        ))}
        {stageTwoCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <GameMenu />
      <BackgroundMusic />
    </>
  );
}
