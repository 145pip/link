import Graph from "./graph";

function isNextPosition(coordA, coordB) {
  const xAxisDiff = Math.abs(coordA[0] - coordB[0]);
  const zAxisDiff = Math.abs(coordA[2] - coordB[2]);

  return (
    (xAxisDiff === 1 && zAxisDiff === 0) || (xAxisDiff === 0 && zAxisDiff === 1)
  );
}

export function createPath(startingCoordinate, coordinates) {
  const graph = new Graph();
  const visited = new Set();
  const queue = [startingCoordinate];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const node = JSON.stringify(currentNode);
    if (!visited.has(node)) {
      visited.add(node);
      graph.addNode(currentNode);

      const neighbors = coordinates.filter(coord => {
        const topCubeCoordinates = [coord[0], coord[1] + 1, coord[2]];
        const coordinateSet = new Set(coordinates.map(c => c.join(",")));
        return (
          !visited.has(JSON.stringify(coord)) &&
          !coordinateSet.has(topCubeCoordinates.join(",")) &&
          isNextPosition(currentNode, coord) &&
          coord[1] === startingCoordinate[1]
        );
      });

      neighbors.forEach(neighbor => {
        if (!visited.has(JSON.stringify(neighbor))) {
          queue.push(neighbor);
        }
      });
    }
  }

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

export function mergeGraphs(graph1, graph2) {
  const mergedGraph = new Graph();

  graph1.nodes.forEach((edges, node) => {
    if (!mergedGraph.contains(JSON.parse(node))) {
      mergedGraph.addNode(JSON.parse(node));
    }
    edges.forEach(edge => {
      if (!mergedGraph.isAdjacent(JSON.parse(node), JSON.parse(edge))) {
        mergedGraph.addEdge(JSON.parse(node), JSON.parse(edge));
      }
    });
  });

  graph2.nodes.forEach((edges, node) => {
    if (!mergedGraph.contains(JSON.parse(node))) {
      mergedGraph.addNode(JSON.parse(node));
    }
    edges.forEach(edge => {
      if (!mergedGraph.isAdjacent(JSON.parse(node), JSON.parse(edge))) {
        mergedGraph.addEdge(JSON.parse(node), JSON.parse(edge));
      }
    });
  });

  return mergedGraph;
}

export function connectEdge(path, linkEdges, coordinates) {
  const { edgeFrom, edgeTo } = linkEdges;
  const { pointA: edgeFromPointA, pointB: edgeFromPointB } = edgeFrom;
  const { pointA: edgeToPointA, pointB: edgeToPointB } = edgeTo;

  let edgeFromCoordinates = [];

  if (edgeFromPointA[0] !== edgeFromPointB[0]) {
    edgeFromCoordinates.push((edgeFromPointA[0] + edgeFromPointB[0]) / 2);
  } else {
    edgeFromCoordinates.push(edgeFromPointA[0] + 0.5);
  }

  edgeFromCoordinates.push(edgeFromPointA[1] - 0.5);

  if (edgeFromPointA[2] !== edgeFromPointB[2]) {
    edgeFromCoordinates.push((edgeFromPointA[2] + edgeFromPointB[2]) / 2);
  } else {
    edgeFromCoordinates.push(edgeFromPointA[2] - 0.5);
  }

  let edgeToCoordinates = [];

  if (edgeToPointA[0] !== edgeToPointB[0]) {
    edgeToCoordinates.push((edgeToPointA[0] + edgeToPointB[0]) / 2);
  } else {
    edgeToCoordinates.push(edgeToPointA[0] - 0.5);
  }

  edgeToCoordinates.push(edgeToPointA[1] - 0.5);

  if (edgeToPointA[2] !== edgeToPointB[2]) {
    edgeToCoordinates.push((edgeToPointA[2] + edgeToPointB[2]) / 2);
  } else {
    edgeToCoordinates.push(edgeToPointA[2] + 0.5);
  }

  if (linkEdges.id === "stageOne-linkEdge-2") {
    edgeFromCoordinates = [1, 5.5, 0];
    edgeToCoordinates = [3, 5.5, 0];
  }

  let newGraph;

  if (path.contains(edgeFromCoordinates)) {
    newGraph = createPath(edgeToCoordinates, coordinates);
  } else {
    newGraph = createPath(edgeFromCoordinates, coordinates);
  }

  const newPath = mergeGraphs(path, newGraph);

  newPath.addEdge(edgeFromCoordinates, edgeToCoordinates);

  return { newPath, edgeFromCoordinates, edgeToCoordinates };
}
