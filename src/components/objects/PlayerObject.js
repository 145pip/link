import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import playerObjectKeyControl from "../../utils/playerObjectKeyControl";

export default function PlayerObject() {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/glb/playerObj.glb");
  const { actions, names } = useAnimations(animations, group);

  const [motionIndex, setMotionIndex] = useState(1);
  const [playerObjectPosition, setPlayerObjectPosition] = useState([0, 1, 1]);
  const [playerObjectRotation, setPlayerObjectRotation] = useState([0, 0, 0]);

  useEffect(() => {
    actions[names[motionIndex]].reset().setEffectiveTimeScale(3).play();

    return () => actions[names[motionIndex]]?.fadeOut(0.2);
  }, [motionIndex, actions, names]);

  playerObjectKeyControl(
    setMotionIndex,
    setPlayerObjectPosition,
    setPlayerObjectRotation
  );

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
