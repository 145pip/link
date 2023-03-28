import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function Starfish({ position, scale }) {
  const { nodes, materials } = useGLTF("/assets/glb/starfish.glb");

  return (
    <group position={position} scale={scale} dispose={null}>
      <group
        position={[-2.23, 0.78, -2.4]}
        rotation={[Math.PI / 2, 0, 0.7]}
        scale={0.01}
      >
        <mesh
          geometry={nodes.Seeaweed.geometry}
          material={materials.Leaves}
          position={[258.7, 280.14, 27.09]}
          rotation={[-1.59, 0.53, -1.62]}
        />
        <mesh
          geometry={nodes.Seeaweed_1.geometry}
          material={materials.Leaves}
          position={[245.35, 263.05, 46.88]}
          rotation={[1.53, -0.74, 1.56]}
        />
        <mesh
          geometry={nodes.Seeaweed_2.geometry}
          material={materials.Leaves}
          position={[40.72, 38.08, 27.09]}
          rotation={[-1.59, 0.53, -1.62]}
        />
      </group>
      <group
        position={[0, 0.41, -0.02]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={0.01}
      >
        <group position={[0, -0.85, -25.56]}>
          <mesh
            geometry={nodes.Starfish_4.geometry}
            material={materials.Starfish}
            position={[4.13, -80, 4.44]}
            rotation={[0, 0, Math.PI / 2]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/glb/starfish.glb");

Starfish.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
