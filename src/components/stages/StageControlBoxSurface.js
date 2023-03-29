import { useState } from "react";
import { useDispatch } from "react-redux";
import { Image } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import PropTypes from "prop-types";

import { setLevel } from "../../redux/stageSlice";
import { setMode } from "../../redux/screenModeSlice";
import { SCREEN_MODE } from "../../utils/constants";

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

  const currentLevel = localStorage.getItem("stageLevel")
    ? parseInt(localStorage.getItem("stageLevel"), 10)
    : 0;

  const handleClick = () => {
    if (level <= currentLevel) {
      dispatch(setLevel(level));
      dispatch(setMode(SCREEN_MODE.GAME_STAGE));
    }
  };

  const handlePointerOver = () => {
    if (level <= currentLevel) {
      setHovered(true);
    }
  };

  const handlePointerOut = () => {
    if (level <= currentLevel) {
      setHovered(false);
    }
  };

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeBufferGeometry args={args} />
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
