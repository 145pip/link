import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PropTypes from "prop-types";

export default function LocationMarker({ position, rotation }) {
  const textureLoader = new THREE.TextureLoader();
  const circle = textureLoader.load("/assets/image/stage-effect/circle.png");

  const outerCircleRef = useRef();
  const innerCircleRef = useRef();

  useFrame(state => {
    const counter = state.clock.elapsedTime;
    const frequency = { outer: 0.5, inner: 1 };
    const scaleCycle = {
      outer: 0.8 * Math.abs(Math.sin(counter * frequency.outer)),
      inner: 0.8 * Math.abs(Math.sin(counter * frequency.inner)),
    };

    outerCircleRef.current.scale.set(scaleCycle.outer, scaleCycle.outer, 1);
    outerCircleRef.current.material.opacity = Math.cos(
      counter * frequency.outer
    );

    innerCircleRef.current.scale.set(scaleCycle.inner, scaleCycle.inner, 1);
    innerCircleRef.current.material.opacity = Math.cos(
      counter * frequency.inner
    );

    if (counter >= 2 * Math.PI * Math.max(frequency.outer, frequency.inner)) {
      state.clock.elapsedTime = 0;
    }
  });

  return (
    <>
      <mesh
        ref={outerCircleRef}
        position={[position[0], position[1] + 0.51, position[2]]}
        rotation={rotation}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial transparent color="lightYellow" map={circle} />
      </mesh>
      <mesh
        ref={innerCircleRef}
        position={[position[0], position[1] + 0.51, position[2]]}
        rotation={rotation}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial transparent color="lightYellow" map={circle} />
      </mesh>
    </>
  );
}

LocationMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
}.isRequired;
