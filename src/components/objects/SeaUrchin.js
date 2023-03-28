import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function SeaUrchin({ position, scale }) {
  const { nodes, materials } = useGLTF("/assets/glb/sea-urchin.glb");

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

useGLTF.preload("/assets/glb/sea-urchin.glb");

SeaUrchin.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
