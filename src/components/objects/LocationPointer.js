import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";

export default function LocationPointer({ position, color }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/glb/location-pointer.glb");

  nodes.Plane_Outsides_0.material.color.set(color);
  nodes.Plane_Insides_0.material.color.set("white");

  useFrame(state => {
    const counter = state.clock.elapsedTime;
    pointerRef.current.rotation.y = -counter;
  });

  return (
    <group
      ref={pointerRef}
      position={[position[0], position[1] + 1, position[2]]}
      rotation={[0, 0, 0]}
      scale={0.15}
    >
      <mesh
        geometry={nodes.Plane_Outsides_0.geometry}
        material={materials.Outsides}
      />
      <mesh
        geometry={nodes.Plane_Insides_0.geometry}
        material={materials.Insides}
      />
    </group>
  );
}

useGLTF.preload("/assets/glb/location-pointer.glb");

LocationPointer.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
}.isRequired;
