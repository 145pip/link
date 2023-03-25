import PropTypes from "prop-types";
import * as THREE from "three";

export default function TutorialGuide({ position, rotation, scale }) {
  const textureLoader = new THREE.TextureLoader();
  const tutorialGuide = textureLoader.load(
    "/assets/image/tutorial/tutorial-guide.png"
  );

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry />
      <meshStandardMaterial
        transparent
        map={tutorialGuide}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

TutorialGuide.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.Number,
}.isRequired;
