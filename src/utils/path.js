import Graph from "./graph";

function getPathPositions(playerPosition, positions) {
  const path = positions.filter(position => {
    const topCubePosition = [position[0], position[1] + 1, position[2]];

    if (position[1] === playerPosition[1]) {
      const hasTopCube = positions.some(
        p =>
          p[0] === topCubePosition[0] &&
          p[1] === topCubePosition[1] &&
          p[2] === topCubePosition[2]
      );

      if (!hasTopCube) return true;
    }

    return false;
  });

  return path;
}

function isNextPosition(positionA, positionB) {
  const xAxisDiff = Math.abs(positionA[0] - positionB[0]);
  const zAxisDiff = Math.abs(positionA[2] - positionB[2]);

  return (
    (xAxisDiff === 1 && zAxisDiff === 0) || (xAxisDiff === 0 && zAxisDiff === 1)
  );
}

export default function createPath(playerPosition, positions) {
  const pathPositions = getPathPositions(playerPosition, positions);
  const graph = new Graph();

  pathPositions.map(position => graph.addNode(position));

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
