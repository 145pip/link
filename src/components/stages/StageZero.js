import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useSelector } from "react-redux";

import Cube from "../objects/Cube";
import SkipMenu from "../menus/SkipMenu";
import AutoSnap from "../../utils/AutoSnap";
import PlayerObject from "../objects/PlayerObject";
import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
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
      <Canvas
        camera={{
          position: [15, 15, 15],
          near: 0.01,
          far: 1000,
          fov: 50,
          zoom: 1,
        }}
      >
        <ambientLight />
        <pointLight position={[-10, -10, -10]} />
        <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
        <Physics>
          {stageZeroCoordinates.cubes.positions.map(position => (
            <Cube key={position.id} position={position.coordinate} />
          ))}
          {stageZeroCoordinates.linkEdges.map(linkEdge => (
            <AutoSnap
              key={linkEdge.id}
              linkSensitivity={0.05}
              linkEdge={linkEdge}
            />
          ))}
        </Physics>
        <PlayerObject />
        <OrbitControls />
      </Canvas>
      <SkipMenu />
    </>
  );
}
