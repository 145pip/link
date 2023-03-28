import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

export default function StarfishOnSand({ position, scale }) {
  const { nodes, materials } = useGLTF("/assets/glb/starfish.glb");

  return (
    <group position={position} scale={scale} dispose={null}>
      <group
        position={[0.24, 0.03, -0.28]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group
          position={[182.78, 157.38, 4.5]}
          rotation={[-0.05, -0.04, -0.41]}
        >
          <mesh
            geometry={nodes.Stone_2_3.geometry}
            material={materials["Sand.1"]}
            position={[-3.79, -1.63, 0.15]}
          />
        </group>
        <group
          position={[153.44, 135.23, 5.74]}
          rotation={[-0.13, -0.06, -1.89]}
        >
          <mesh
            geometry={nodes.Stone_2_2.geometry}
            material={materials["Sand.1"]}
            position={[1.29, -3.92, 0.24]}
          />
        </group>
        <group
          position={[159.99, 196.1, -5.34]}
          rotation={[-0.13, -0.06, -1.89]}
        >
          <mesh
            geometry={nodes.Stone_5_2.geometry}
            material={materials["Sand.1"]}
            position={[1.29, -3.92, 0.24]}
          />
        </group>
        <group
          position={[-266.07, 185.07, 9.58]}
          rotation={[-0.1, 0.09, -3.05]}
        >
          <mesh
            geometry={nodes.Stone_6_2.geometry}
            material={materials["Sand.1"]}
            position={[4.1, -0.37, -0.38]}
          />
        </group>
        <mesh
          geometry={nodes.Stone_8_2.geometry}
          material={materials["Sand.1"]}
          position={[157.41, -223.26, 2.54]}
          rotation={[0.14, 0, 0.8]}
        />
      </group>
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
      <group
        position={[0, -0.4, -0.03]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <mesh
          geometry={nodes.Sand_2.geometry}
          material={materials.Sand}
          position={[-4.13, 0, 0]}
        />
      </group>
      <mesh
        geometry={nodes.Stone_3_2.geometry}
        material={materials["Sand.1"]}
        position={[681.99, 1229.58, -145.71]}
      />
    </group>
  );
}

useGLTF.preload("/assets/glb/starfish.glb");

StarfishOnSand.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
