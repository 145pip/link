import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import PropTypes from "prop-types";

import LinkAnglesCalculator from "./LinkAngleCalculator";

export default function AutoSnap({ linkSensitivity, linkEdge }) {
  const { camera } = useThree();
  const linkAngles = LinkAnglesCalculator(linkEdge);

  useFrame(() => {
    if (
      camera.rotation.x > linkAngles.x - linkSensitivity &&
      camera.rotation.x < linkAngles.x + linkSensitivity &&
      camera.rotation.y > linkAngles.y - linkSensitivity &&
      camera.rotation.y < linkAngles.y + linkSensitivity
    ) {
      camera.rotation.set(linkAngles.x, linkAngles.y, camera.rotation.z);
    }
  });

  return (
    <OrthographicCamera
      makeDefault
      position={[camera.position.x, camera.position.y, camera.position.z]}
      fov={50}
      near={0.01}
      far={1000}
      zoom={60}
    />
  );
}

AutoSnap.propTypes = {
  linkSensitivity: PropTypes.number.isRequired,
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
