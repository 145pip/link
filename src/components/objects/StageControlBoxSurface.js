import { useState } from "react";
import { useDispatch } from "react-redux";
import { Image } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import PropTypes from "prop-types";

import { setLevel } from "../../redux/stageLevelSlice";
import { setMode } from "../../redux/screenModeSlice";

export default function StageControlBoxSurface({
  args,
  position,
  rotation,
  level,
  defaultImage,
  hoverImage,
}) {
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [ref] = usePlane(() => ({
    position,
    rotation,
  }));

  return (
    <mesh
      ref={ref}
      onClick={() => {
        dispatch(setLevel(level));
        dispatch(setMode("GameStage"));
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
