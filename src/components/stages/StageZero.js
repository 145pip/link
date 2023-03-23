import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import Cube from "../objects/Cube";
import SkipMenu from "../menus/SkipMenu";
import AutoSnap from "../../utils/AutoSnap";
import PlayerObject from "../objects/PlayerObject";
import LocationMarker from "../objects/LocationMarker";
import LocationPointer from "../objects/LocationPointer";
import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";

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
        <LocationPointer position={[0, 5.5, 0]} color="orange" />
        <LocationMarker
          position={[0, 5, 0]}
          rotation={[(90 * Math.PI) / 180, 0, 0]}
        />
        <PlayerObject position={[0, 1, 1]} rotation={[0, 0, 0]} />
        <OrbitControls />
      </Canvas>
      <SkipMenu />
    </>
  );
}
