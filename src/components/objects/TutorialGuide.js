import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import PropTypes from "prop-types";

export default function TutorialGuide({
  position,
  rotation,
  scale,
  setEnableCameraRotation,
}) {
  const isLinked = useSelector(state => state.edgeLink.isLinked);
  const currentPosition = useSelector(
    state => state.currentCoordinates.coordinates
  );
  const textureLoader = new THREE.TextureLoader();
  const missions = {
    mission1: textureLoader.load("/assets/image/tutorial/mission1.png"),
    mission2: textureLoader.load("/assets/image/tutorial/mission2.png"),
    mission3: textureLoader.load("/assets/image/tutorial/mission3.png"),
    mission4: textureLoader.load("/assets/image/tutorial/mission4.png"),
    mission5: textureLoader.load("/assets/image/tutorial/mission5.png"),
  };

  const keydownGuides = {
    key: textureLoader.load("/assets/image/tutorial/key.png"),
    keyArrowUp: textureLoader.load("/assets/image/tutorial/key-up.png"),
    keyArrowLeft: textureLoader.load("/assets/image/tutorial/key-left.png"),
  };

  const clickGuides = {
    mouse: textureLoader.load("/assets/image/tutorial/mouse.png"),
    mouseLeft: textureLoader.load(
      "/assets/image/tutorial/mouse-left-click.png"
    ),
  };

  const [currentMission, setCurrentMission] = useState(missions.mission1);
  const [currentKeydown, setCurrentKeydown] = useState(
    keydownGuides.keyArrowUp
  );
  const [currentClick, setCurrentClick] = useState(clickGuides.mouse);

  useEffect(() => {
    if (
      currentPosition[0] === 0 &&
      currentPosition[1] === 0.5 &&
      currentPosition[2] === 4
    ) {
      setCurrentMission(missions.mission2);
      setCurrentKeydown(keydownGuides.keyArrowLeft);
    }
  }, [currentPosition]);

  useEffect(() => {
    const handleKeyUp = event => {
      if (
        event.code === "ArrowLeft" &&
        currentPosition[0] === 0 &&
        currentPosition[1] === 0.5 &&
        currentPosition[2] === 4
      ) {
        setCurrentMission(missions.mission3);
        setCurrentKeydown(keydownGuides.keyArrowUp);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentMission]);

  useEffect(() => {
    if (
      currentPosition[0] === 4 &&
      currentPosition[1] === 0.5 &&
      currentPosition[2] === 4
    ) {
      setCurrentMission(missions.mission4);
      setCurrentKeydown(keydownGuides.key);
      setCurrentClick(clickGuides.mouseLeft);
      setEnableCameraRotation(true);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (isLinked) {
      setCurrentMission(missions.mission5);
      setCurrentKeydown(keydownGuides.keyArrowUp);
    }
  }, [currentPosition]);

  return (
    <>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry />
        <meshStandardMaterial
          transparent
          map={currentMission}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[position[0] - 1, position[1], position[2] + 6]}
        rotation={rotation}
        scale={scale - 3}
      >
        <planeGeometry />
        <meshStandardMaterial
          transparent
          map={currentKeydown}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[position[0] + 2, position[1], position[2] + 6]}
        rotation={rotation}
        scale={[2, 3, 1]}
      >
        <planeGeometry />
        <meshStandardMaterial
          transparent
          map={currentClick}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

TutorialGuide.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
