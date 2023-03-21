import PropTypes from "prop-types";

export default function Cube({ position }) {
  const color = "rgb(51, 153, 255)";

  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

Cube.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
