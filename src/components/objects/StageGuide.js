import { useSelector } from "react-redux";
import * as THREE from "three";
import PropTypes from "prop-types";

export default function StageGuide({ position, rotation, scale }) {
  const currentStage = useSelector(state => state.stage.level);
  const stageInfo = {
    1: "/assets/image/stage-guide/stage1-info.png",
    2: "/assets/image/stage-guide/stage2-info.png",
    3: "/assets/image/stage-guide/stage3-info.png",
  };
  const textureLoader = new THREE.TextureLoader();
  const currentStageInfo = textureLoader.load(stageInfo[currentStage]);

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry />
      <meshStandardMaterial
        transparent
        map={currentStageInfo}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

StageGuide.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.arrayOf(PropTypes.number),
}.isRequired;
