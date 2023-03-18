import { useState } from "react";
import { Image } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import PropTypes from "prop-types";


export default function StageControlBoxSurface({
  args,
  position,
  rotation,
  level,
  defaultImage,
  hoverImage,
}) {

  const [hovered, setHovered] = useState(false);
  const [ref] = usePlane(() => ({
    position,
    rotation,
  }));

  return (
    <mesh
      ref={ref}
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeBufferGeometry args={args} />
      <meshStandardMaterial
        roughness={1}
        transparent
        opacity={0.6}
        color={hovered ? "rgb(51, 153, 255)" : "aquamarine"}
      />
      <Image
        raycast={() => null}
        position={[0, 0, 0.001]}
        url={hovered ? hoverImage : defaultImage}
      />
    </mesh>
  );
}

StageControlBoxSurface.propTypes = {
  args: PropTypes.arrayOf(PropTypes.number),
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  defaultImage: PropTypes.string,
  hoverImage: PropTypes.string,
}.isRequired;
