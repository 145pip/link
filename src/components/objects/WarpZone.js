import * as THREE from "three";
import PropTypes from "prop-types";

export default function Warp({ position, rotation, scale }) {
  const textureLoader = new THREE.TextureLoader();
  const warp = textureLoader.load("/assets/image/stage-effect/hole.png");

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry />
      <meshStandardMaterial transparent map={warp} />
    </mesh>
  );
}

Warp.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}.isRequired;
