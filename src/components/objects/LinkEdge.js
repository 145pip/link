import PropTypes from "prop-types";
import { Line } from "@react-three/drei";

export default function LinkEdge({ edgeFrom, edgeTo, color, thickness }) {
  return (
    <>
      <Line
        points={[edgeFrom.startingPoint, edgeFrom.endPoint]}
        color={color}
        linewidth={thickness}
      />
      <Line
        points={[edgeTo.startingPoint, edgeTo.endPoint]}
        color={color}
        linewidth={thickness}
      />
    </>
  );
}

LinkEdge.propTypes = {
  edgeFrom: PropTypes.shape({
    startingPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
    endPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  edgeTo: PropTypes.shape({
    startingPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
    endPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  thickness: PropTypes.number.isRequired,
};
