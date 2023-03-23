import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";

export default function LocationPointer({ position, color }) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF("/assets/glb/pointer.glb");
  nodes.Plane_Outsides_0.material.color.set(color);

  useFrame(state => {
    const counter = state.clock.elapsedTime;
    pointerRef.current.rotation.y = -counter;
  });

  return (
    <group ref={pointerRef}>
      <group rotation={[0, 0, 0]} position={position} scale={0.1}>
        <group>
          <group>
            <mesh
              geometry={nodes.Plane_Outsides_0.geometry}
              material={materials.Outsides}
            />
            <mesh
              geometry={nodes.Plane_Insides_0.geometry}
              material={materials.Insides}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/glb/pointer.glb");

LocationPointer.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
}.isRequired;
