import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";

import stageZeroCoordinates from "../../data/stageZeroCoordinates.json";
import Cube from "../objects/Cube";
import Axis from "../objects/Axis";
import LinkEdge from "../objects/LinkEdge";
import LetterF from "../objects/letterF";

export default function StageZero() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[-10, -10, -10]} />
      <spotLight angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
      <Axis />
      <OrthographicCamera
        makeDefault
        position={[15, 15, 15]}
        fov={50}
        near={0.01}
        far={1000}
        zoom={60}
      />
      <Physics>
        {stageZeroCoordinates.cubes.positions.map((coordinate, index) => (
          <Cube key={`stage0-cube-${index + 1}`} position={coordinate} />
        ))}
        {stageZeroCoordinates.linkEdges.map((coordinate, index) => (
          <LinkEdge
            key={`stage0-linkEdge-${index + 1}`}
            edgeFrom={coordinate.edgeFrom}
            edgeTo={coordinate.edgeTo}
            color={coordinate.color}
            thickness={coordinate.thickness}
          />
        ))}
      </Physics>
      <LetterF
        position={[0, 1, 1.5]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.5}
      />
      <OrbitControls />
    </Canvas>
  );
}
