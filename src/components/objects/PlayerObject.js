import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import throttle from "../../utils/throttle";

export default function PlayerObject() {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/glb/playerObj.glb");
  const { actions, names } = useAnimations(animations, group);

  const MOVEMENT_INCREMENT = 0.05;
  const ROTATION_INCREMENT = (5 * Math.PI) / 180;
  const KEYBOARD_EVENT_CODE = {
    ARROW_UP: "ArrowUp",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
  };
  const playerObjectHeadDirections = [
    { x: 0, z: 1 },
    { x: 1, z: 0 },
    { x: 0, z: -1 },
    { x: -1, z: 0 },
  ];

  const [playerObjectPosition, setPlayerObjectPosition] = useState([0, 1, 1]);
  const [playerObjectRotation, setPlayerObjectRotation] = useState([0, 0, 0]);
  const [motionIndex, setMotionIndex] = useState(1);
  const [rotationCount, setRotationCount] = useState(0);

  useEffect(() => {
    actions[names[motionIndex]].reset().setEffectiveTimeScale(3).play();

    return () => actions[names[motionIndex]]?.fadeOut(0.2);
  }, [motionIndex, actions, names]);

  useEffect(() => {
    const handleKeyDown = throttle(event => {
      if (event.code === KEYBOARD_EVENT_CODE.ARROW_UP) {
        setMotionIndex(0);
        setTimeout(() => setMotionIndex(1), 500);

        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0] +
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].x,
              position[1],
              position[2] +
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].z,
            ]);
          }, i * 25);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_DOWN) {
        setMotionIndex(0);
        setTimeout(() => setMotionIndex(1), 500);

        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            setPlayerObjectPosition(position => [
              position[0] -
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].x,
              position[1],
              position[2] -
                MOVEMENT_INCREMENT *
                  playerObjectHeadDirections[rotationCount % 4].z,
            ]);
          }, i * 25);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_LEFT) {
        setMotionIndex(0);
        setRotationCount(previousCount => previousCount + 1);
        setTimeout(() => setMotionIndex(1), 180);

        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(rotation => [
              rotation[0],
              rotation[1] + ROTATION_INCREMENT,
              rotation[2],
            ]);
          }, i * 10);
        }
      } else if (event.code === KEYBOARD_EVENT_CODE.ARROW_RIGHT) {
        setMotionIndex(0);
        setRotationCount(previousCount => previousCount + 3);
        setTimeout(() => setMotionIndex(1), 180);

        for (let i = 0; i < 18; i++) {
          setTimeout(() => {
            setPlayerObjectRotation(rotation => [
              rotation[0],
              rotation[1] - ROTATION_INCREMENT,
              rotation[2],
            ]);
          }, i * 10);
        }
      }
    }, 180);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [rotationCount]);

  return (
    <group ref={group} dispose={null}>
      <group
        name="Scene"
        position={playerObjectPosition}
        rotation={playerObjectRotation}
        scale={2}
      >
        <group name="Armature" scale={0.01}>
          <primitive object={nodes.Character1_Hips} />
          <skinnedMesh
            name="pCube11"
            geometry={nodes.pCube11.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.pCube11.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/glb/playerObj.glb");
