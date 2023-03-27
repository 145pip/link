import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function Hedgehog({ position, scale }) {
  const { nodes, materials } = useGLTF("/assets/glb/hedge-hog.glb");

  return (
    <group dispose={null}>
      <group position={position}>
        <mesh
          geometry={nodes.Seaurchin_1.geometry}
          material={materials.SeaurchinSpikes}
          scale={scale}
        />
        <mesh
          geometry={nodes.Seaurchin_2.geometry}
          material={materials.SeaurchinBody}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/glb/hedge-hog.glb");

Hedgehog.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
