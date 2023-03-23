import Graph from "./graph";

function getUsablePath(targetY, coordinates) {
  const coordinateSet = new Set(coordinates.map(c => c.join(",")));

  return coordinates.filter(coordinate => {
    const topCubeCoordinates = [
      coordinate[0],
      coordinate[1] + 1,
      coordinate[2],
    ];

    return (
      coordinate[1] === targetY &&
      !coordinateSet.has(topCubeCoordinates.join(","))
    );
  });
}

function isNextPosition(coordinatesA, coordinatesB) {
  const xAxisDiff = Math.abs(coordinatesA[0] - coordinatesB[0]);
  const zAxisDiff = Math.abs(coordinatesA[2] - coordinatesB[2]);

  return (
    (xAxisDiff === 1 && zAxisDiff === 0) || (xAxisDiff === 0 && zAxisDiff === 1)
  );
}

export function createPath(targetY, coordinates) {
  const graph = new Graph();
  const path = getUsablePath(targetY, coordinates);

  path.map(coordinate => graph.addNode(coordinate));

  const nodesArray = Array.from(graph.nodes.keys());

  for (let i = 0; i < nodesArray.length; i++) {
    const nodeA = JSON.parse(nodesArray[i]);

    for (let j = i + 1; j < nodesArray.length; j++) {
      const nodeB = JSON.parse(nodesArray[j]);

      if (isNextPosition(nodeA, nodeB)) {
        graph.addEdge(nodeA, nodeB);
      }
    }
  }

  return graph;
}

export function connectEdge(path, linkEdges, coordinates) {
  const { edgeFrom, edgeTo } = linkEdges;
  const { pointA: edgeFromPointA, pointB: edgeFromPointB } = edgeFrom;
  const { pointA: edgeToPointA, pointB: edgeToPointB } = edgeTo;

  const edgeFromCoordinates = edgeFromPointA.map((coord, i) =>
    edgeFromPointA[i] !== edgeFromPointB[i]
      ? (edgeFromPointA[i] + edgeFromPointB[i]) / 2
      : edgeFromPointA[i] - 0.5
  );

  const edgeToCoordinates = edgeToPointA.map((coord, i) => {
    if (edgeToPointA[i] !== edgeToPointB[i]) {
      return (edgeToPointA[i] + edgeToPointB[i]) / 2;
    }
    if (i === 1) {
      return edgeToPointA[i] - 0.5;
    }
    return edgeToPointA[i] + 0.5;
  });

  const targetY = path.contains(edgeFromCoordinates)
    ? edgeToCoordinates[1]
    : edgeFromCoordinates[1];

  const addedPath = getUsablePath(targetY, coordinates);

  addedPath.map(coordinate => path.addNode(coordinate));
  path.addEdge(edgeFromCoordinates, edgeToCoordinates);

  return path;
}
