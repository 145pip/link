import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types";

import useKeyControl from "../../hooks/useKeyControl";
import { PLAYER_MOTIONS, PLAYER_HEIGHT } from "../../utils/constants";

export default function Player({ position, rotation, path }) {
  const textureLoader = new THREE.TextureLoader();
  const playerFaces = [
    textureLoader.load("/assets/image/player-face/face1.png"),
    textureLoader.load("/assets/image/player-face/face2.png"),
    textureLoader.load("/assets/image/player-face/face3.png"),
    textureLoader.load("/assets/image/player-face/face4.png"),
    textureLoader.load("/assets/image/player-face/face5.png"),
    textureLoader.load("/assets/image/player-face/face6.png"),
  ];

  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/glb/player.glb");
  const { actions, names } = useAnimations(animations, group);

  const [motionIndex, setMotionIndex] = useState(PLAYER_MOTIONS.STANDING);
  const [playerPosition, setPlayerPosition] = useState([
    position[0],
    position[1] + PLAYER_HEIGHT,
    position[2],
  ]);
  const [playerRotation, setPlayerRotation] = useState(rotation);
  const [playerFace, setPlayerFace] = useState(playerFaces[0]);

  useEffect(() => {
    actions[names[motionIndex]].reset().setEffectiveTimeScale(3).play();

    return () => {
      actions[names[motionIndex]]?.fadeOut(0.2);
    };
  }, [motionIndex, actions, names]);

  useEffect(() => {
    const randomFaceIndex = Math.round(Math.random() * 5);

    setPlayerFace(playerFaces[randomFaceIndex]);
  }, [motionIndex]);

  useKeyControl(
    path,
    playerPosition,
    setMotionIndex,
    setPlayerPosition,
    setPlayerRotation
  );

  return (
    <group
      ref={group}
      dispose={null}
      name="Scene"
      position={playerPosition}
      rotation={playerRotation}
      scale={0.9}
    >
      <group name="Armature" position={[-0.02, 0.39, 0]} scale={0.22}>
        <primitive object={nodes.spine1} />
        <primitive object={nodes.neutral_bone} />
        <group name="Cube001">
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials["shirt.001"]}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="body_1"
            geometry={nodes.body_1.geometry}
            material={materials.pants}
            skeleton={nodes.body_1.skeleton}
          />
        </group>
        <group name="Cube002">
          <skinnedMesh
            name="handRight"
            geometry={nodes.handRight.geometry}
            material={materials["skin.001"]}
            skeleton={nodes.handRight.skeleton}
          />
          <skinnedMesh
            name="handRight_1"
            geometry={nodes.handRight_1.geometry}
            material={materials.shirt}
            skeleton={nodes.handRight_1.skeleton}
          />
        </group>
        <group name="Cube003">
          <skinnedMesh
            name="handLeft"
            geometry={nodes.handLeft.geometry}
            material={materials["skin.001"]}
            skeleton={nodes.handLeft.skeleton}
          />
          <skinnedMesh
            name="handLeft_1"
            geometry={nodes.handLeft_1.geometry}
            material={materials.shirt}
            skeleton={nodes.handLeft_1.skeleton}
          />
        </group>
      </group>
      <group name="Cube005">
        <skinnedMesh
          name="Cube001_1"
          geometry={nodes.Cube001_1.geometry}
          material={materials["skin.001"]}
          skeleton={nodes.Cube001_1.skeleton}
        />
        <skinnedMesh
          name="Cube001_2"
          geometry={nodes.Cube001_2.geometry}
          material={materials.hair}
          skeleton={nodes.Cube001_2.skeleton}
        />
        <mesh
          position={[0.21, 1.38, 0]}
          rotation={[0, 0.5 * Math.PI, 0]}
          scale={0.45}
        >
          <planeGeometry />
          <meshStandardMaterial
            transparent
            map={playerFace}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/glb/player.glb");

Player.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  path: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number))
  ),
}.isRequired;
