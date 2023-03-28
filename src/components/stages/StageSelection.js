import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import StageControlBox from "./StageControlBox";

export default function StageSelection() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 3.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <PresentationControls config={{ mass: 0.02, tension: 1500 }}>
        <StageControlBox />
      </PresentationControls>
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.75}
        scale={10}
        blur={1.5}
        far={4}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
