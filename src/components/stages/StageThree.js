import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  ContactShadows,
} from "@react-three/drei";

import stageThreeCoordinates from "../../data/stageThreeCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import Starfish from "../objects/Starfish";
import StarfishOnSand from "../objects/StarfishOnSand";
import SeaUrchin from "../objects/SeaUrchin";
import StageGuide from "../objects/StageGuide";
import usePath from "../../hooks/usePath";
import AutoSnap from "../../utils/AutoSnap";
import GameMenu from "../menus/GameMenu";
import BackgroundMusic from "../music/BackgroundMusic";
import { setCurrentCoordinates } from "../../redux/currentCoordinatesSlice";
import { setDeparture, setArrival } from "../../redux/stageSlice";

export default function StageThree() {
  const dispatch = useDispatch();
  const coordinates = stageThreeCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const path = usePath(stageThreeCoordinates.departure, coordinates);

  useEffect(() => {
    dispatch(setCurrentCoordinates(stageThreeCoordinates.departure));
    dispatch(setDeparture(stageThreeCoordinates.departure));
    dispatch(setArrival(stageThreeCoordinates.arrival));
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
        {stageThreeCoordinates.cubes.positions.map(position => (
          <CubeElement
            key={position.id}
            position={position.coordinate}
            scale={0.5}
            color="#03a9f4"
          />
        ))}
        <Player
          position={stageThreeCoordinates.departure}
          rotation={[0, 1.5 * Math.PI, 0]}
          path={path}
        />
        <StarfishOnSand position={[4, 5.1, 4]} scale={0.18} />
        <StarfishOnSand position={[3, 4.1, 5]} scale={0.18} />
        <Starfish position={[-4, 0.1, 3.2]} scale={0.5} />
        <SeaUrchin position={[3, 5.4, 4]} scale={8} />
        <SeaUrchin position={[4, 5.4, 3]} scale={8} />
        <SeaUrchin position={[4, 5.4, 5]} scale={8} />
        <SeaUrchin position={[5, 5.4, 4]} scale={8} />
        <SeaUrchin position={[-6, 0.4, 3]} scale={8} />
        <SeaUrchin position={[-7, 0.4, 3.3]} scale={8} />
        <SeaUrchin position={[-6.5, 0.4, 3.9]} scale={8} />
        <SeaUrchin position={[-6.5, 1, 3.3]} scale={8} />
        <StageGuide
          position={[-5, 0, 0]}
          rotation={[1.5 * Math.PI, 0, 0]}
          scale={[8, 6, 0.1]}
        />
        <LocationPointer
          position={stageThreeCoordinates.arrival}
          color="indianred"
        />
        <LocationMarker
          position={stageThreeCoordinates.arrival}
          rotation={[1.5 * Math.PI, 0, 0]}
        />
        {stageThreeCoordinates.linkEdges.map(linkEdge => (
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
