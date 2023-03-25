import * as THREE from "three";
import PropTypes, { number } from "prop-types";

export default function KeyboardArrow({ position, rotation, scale }) {
  const textureLoader = new THREE.TextureLoader();
  const keyboardArrow = textureLoader.load(
    "/assets/image/tutorial/keyboard-arrow.png"
  );

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry />
      <meshStandardMaterial
        transparent
        map={keyboardArrow}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

KeyboardArrow.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: number,
}.isRequired;
