import * as THREE from "three";

export default function LinkAngleCalculator(linkEdge) {
  const edgeFromMidpoint = {
    x: (linkEdge.edgeFrom.pointB[0] + linkEdge.edgeFrom.pointA[0]) / 2,
    y: (linkEdge.edgeFrom.pointB[1] + linkEdge.edgeFrom.pointA[1]) / 2,
    z: (linkEdge.edgeFrom.pointB[2] + linkEdge.edgeFrom.pointA[2]) / 2,
  };

  const edgeToMidpoint = {
    x: (linkEdge.edgeTo.pointB[0] + linkEdge.edgeTo.pointA[0]) / 2,
    y: (linkEdge.edgeTo.pointB[1] + linkEdge.edgeTo.pointA[1]) / 2,
    z: (linkEdge.edgeTo.pointB[2] + linkEdge.edgeTo.pointA[2]) / 2,
  };

  const edgeConnectingVector = new THREE.Vector3(
    (edgeToMidpoint.x - edgeFromMidpoint.x) / 2,
    (edgeToMidpoint.y - edgeFromMidpoint.y) / 2,
    (edgeToMidpoint.z - edgeFromMidpoint.z) / 2
  );

  const linkAngle = {
    x:
      -Math.atan2(edgeConnectingVector.y, edgeConnectingVector.z) -
      (180 * Math.PI) / 180,
    y: -Math.atan2(
      edgeConnectingVector.x,
      Math.sqrt(
        edgeConnectingVector.y * edgeConnectingVector.y +
          edgeConnectingVector.z * edgeConnectingVector.z
      )
    ),
    z: 0,
  };

  return linkAngle;
}
