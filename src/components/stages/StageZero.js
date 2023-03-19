import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import Cube from "../objects/Cube";
import Axis from "../objects/Axis";
import LinkEdge from "../objects/LinkEdge";
import PlayerObject from "../objects/PlayerObject";
import AutoSnap from "../../utils/AutoSnap";
import SkipMenu from "../menus/SkipMenu";

export default function StageZero() {
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
        <Axis />
        <Physics>
          {stageZeroCoordinates.cubes.positions.map(position => (
            <Cube key={`stage0-cube-${position}`} position={position} />
          ))}
          {stageZeroCoordinates.linkEdges.map(linkEdge => (
            <LinkEdge
              key={`stage0-link-edge-${linkEdge}`}
              linkEdge={linkEdge}
            />
          ))}
          {stageZeroCoordinates.linkEdges.map(linkEdge => (
            <AutoSnap
              key={`stage0-auto-snap-${linkEdge}`}
              linkSensitivity={0.05}
              linkEdge={linkEdge}
            />
          ))}
        </Physics>
        <PlayerObject
          position={[0, 1, 1.5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.5}
        />
        <OrbitControls />
      </Canvas>
      <SkipMenu />
    </>
  );
}
