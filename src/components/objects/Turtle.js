import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function Turtle({ position, scale, rotation }) {
  const { nodes, materials } = useGLTF("/assets/glb/turtle.glb");

  return (
    <group position={position} scale={scale} rotation={rotation} dispose={null}>
      <mesh
        geometry={nodes.Stone_3_2.geometry}
        material={materials["Sand.1"]}
        position={[681.99, 1229.58, -145.71]}
      />
      <group scale={0.01}>
        <mesh
          geometry={nodes.Turtle_Turtle_0.geometry}
          material={materials.Turtle}
          position={[0, -39.29, 7.62]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/turtle.glb");

Turtle.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
