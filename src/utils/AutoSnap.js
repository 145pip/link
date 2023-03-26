import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import linkAnglesCalculator from "./linkAngleCalculator";
import { setIsLinked, setLinkEdge } from "../redux/edgeLinkSlice";

export default function AutoSnap({ linkSensitivity, linkEdge }) {
  const { camera } = useThree();
  const dispatch = useDispatch();
  const prevInRange = useRef(null);
  const linkAngles = linkAnglesCalculator(linkEdge);

  const checkCameraRotation = () => {
    const inRange =
      camera.rotation.x > linkAngles.x - linkSensitivity &&
      camera.rotation.x < linkAngles.x + linkSensitivity &&
      camera.rotation.y > linkAngles.y - linkSensitivity &&
      camera.rotation.y < linkAngles.y + linkSensitivity;

    if (inRange) {
      camera.rotation.set(linkAngles.x, linkAngles.y, camera.rotation.z);
    }

    if (prevInRange.current !== inRange) {
      prevInRange.current = inRange;
      dispatch(setIsLinked(inRange));
      dispatch(setLinkEdge(linkEdge));
    }
  };

  useFrame(() => {
    checkCameraRotation();
  });

  return (
    <OrthographicCamera
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
