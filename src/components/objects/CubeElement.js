import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function CubeElement({ position, scale, color }) {
  const { nodes, materials } = useGLTF("/assets/glb/cube-element.glb");

  nodes.CubeElement.material.color.set(color);

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.CubeElement.geometry}
        material={materials.baseMaterial}
        position={position}
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload("/assets/glb/cube-element.glb");

CubeElement.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
}.isRequired;
