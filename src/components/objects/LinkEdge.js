import PropTypes from "prop-types";
import { Line } from "@react-three/drei";

export default function LinkEdge({ linkEdge }) {
  return (
    <>
      <Line
        points={[linkEdge.edgeFrom.pointA, linkEdge.edgeFrom.pointB]}
        color={linkEdge.color}
        linewidth={linkEdge.thickness}
      />
      <Line
        points={[linkEdge.edgeTo.pointA, linkEdge.edgeTo.pointB]}
        color={linkEdge.color}
        linewidth={linkEdge.thickness}
      />
    </>
  );
}

LinkEdge.propTypes = {
  linkEdge: PropTypes.shape({
    edgeFrom: PropTypes.shape({
      pointA: PropTypes.arrayOf(PropTypes.number),
      pointB: PropTypes.arrayOf(PropTypes.number),
    }),
    edgeTo: PropTypes.shape({
      pointA: PropTypes.arrayOf(PropTypes.number),
      pointB: PropTypes.arrayOf(PropTypes.number),
    }),
    color: PropTypes.string,
    thickness: PropTypes.number,
  }).isRequired,
};
