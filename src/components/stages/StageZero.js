import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import CubeElement from "../objects/CubeElement";
import Player from "../objects/Player";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import AutoSnap from "../../utils/AutoSnap";
import SkipMenu from "../menus/SkipMenu";
import { createPath, connectEdge } from "../../utils/path";

export default function StageZero() {
  const coordinates = stageZeroCoordinates.cubes.positions.map(
    position => position.coordinate
  );
  const isLinked = useSelector(state => state.edgeLink.isLinked);
  const currentLinkEdge = useSelector(state => state.edgeLink.linkEdge);
  const [path, setPath] = useState(
    createPath(stageZeroCoordinates.departure[1], coordinates)
  );

  useEffect(() => {
    if (isLinked) {
      setPath(connectEdge(path, currentLinkEdge, coordinates));
    }
  }, [isLinked]);

  return (
    <>
      <Canvas camera={{ position: [50, 50, 50] }}>
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
        <LocationPointer position={[0, 5.5, 0]} color="yellow" />
        <LocationMarker position={[0, 5, 0]} rotation={[1.5 * Math.PI, 0, 0]} />
        {stageZeroCoordinates.linkEdges.map(linkEdge => (
          <AutoSnap
            key={linkEdge.id}
            linkSensitivity={0.05}
            linkEdge={linkEdge}
          />
        ))}
        <Player position={[0, 1, 1]} rotation={[0, 1.5 * Math.PI, 0]} />
        <OrbitControls />
      </Canvas>
      <SkipMenu />
    </>
  );
}
