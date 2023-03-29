import Graph from "./graph";

function isNextPosition(coordA, coordB) {
  const xAxisDiff = Math.abs(coordA[0] - coordB[0]);
  const zAxisDiff = Math.abs(coordA[2] - coordB[2]);

  return (
    ((xAxisDiff === 1 && zAxisDiff === 0) ||
      (xAxisDiff === 0 && zAxisDiff === 1)) &&
    coordA[1] === coordB[1]
  );
}

function findNeighbors(currentNode, coordinates, visited) {
  return coordinates.filter(coord => {
    const topCubeCoordinates = [coord[0], coord[1] + 1, coord[2]];
    const coordinateSet = new Set(coordinates.map(c => c.join(",")));

    return (
      !visited.has(JSON.stringify(coord)) &&
      !coordinateSet.has(topCubeCoordinates.join(",")) &&
      isNextPosition(currentNode, coord) &&
      coord[1] === currentNode[1]
    );
  });
}

function createEdges(graph, nodesArray) {
  nodesArray.forEach((nodeA, i) => {
    nodesArray.slice(i + 1).forEach(nodeB => {
      if (isNextPosition(nodeA, nodeB)) {
        graph.addEdge(nodeA, nodeB);
      }
    });
  });
}

function processCurrentNode(currentNode, graph, coordinates, visited) {
  const node = JSON.stringify(currentNode);

  if (!visited.has(node)) {
    visited.add(node);
    graph.addNode(currentNode);

    const neighbors = findNeighbors(currentNode, coordinates, visited);
    const unvisitedNeighbors = neighbors.filter(neighbor => {
      return !visited.has(JSON.stringify(neighbor));
    });
    return unvisitedNeighbors;
  }

  return [];
}

export function createPath(startingCoordinate, coordinates) {
  const graph = new Graph();
  const visited = new Set();
  const queue = [startingCoordinate];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const unvisitedNeighbors = processCurrentNode(
      currentNode,
      graph,
      coordinates,
      visited
    );
    unvisitedNeighbors.forEach(neighbor => {
      queue.push(neighbor);
    });
  }

  const nodesArray = Array.from(graph.nodes.keys()).map(JSON.parse);
  createEdges(graph, nodesArray);

  return graph;
}

function addNodesAndEdges(graph, targetGraph) {
  graph.nodes.forEach((edges, node) => {
    const parsedNode = JSON.parse(node);

    if (!targetGraph.contains(parsedNode)) {
      targetGraph.addNode(parsedNode);
    }

    edges.forEach(edge => {
      const parsedEdge = JSON.parse(edge);

      if (!targetGraph.isAdjacent(parsedNode, parsedEdge)) {
        targetGraph.addEdge(parsedNode, parsedEdge);
      }
    });
  });
}

export function mergeGraphs(graph1, graph2) {
  const mergedGraph = new Graph();

  addNodesAndEdges(graph1, mergedGraph);
  addNodesAndEdges(graph2, mergedGraph);

  return mergedGraph;
}

export function connectEdge(path, linkEdges, coordinates) {
  const { edgeFrom, edgeTo } = linkEdges;
  const { pointA: edgeFromPointA, pointB: edgeFromPointB } = edgeFrom;
  const { pointA: edgeToPointA, pointB: edgeToPointB } = edgeTo;

  let edgeFromCoordinates = [];
  let edgeToCoordinates = [];

  if (edgeFromPointA[0] !== edgeFromPointB[0]) {
    edgeFromCoordinates[0] = (edgeFromPointA[0] + edgeFromPointB[0]) / 2;
  } else if (edgeFromPointA[0] < edgeToPointA[0]) {
    edgeFromCoordinates[0] = edgeFromPointA[0] - 0.5;
  } else {
    edgeFromCoordinates[0] = edgeFromPointA[0] + 0.5;
  }

  edgeFromCoordinates[1] = edgeFromPointA[1] - 0.5;

  if (edgeFromPointA[2] !== edgeFromPointB[2]) {
    edgeFromCoordinates[2] = (edgeFromPointA[2] + edgeFromPointB[2]) / 2;
  } else if (edgeFromPointA[2] < edgeToPointA[2]) {
    edgeFromCoordinates[2] = edgeFromPointA[2] - 0.5;
  } else {
    edgeFromCoordinates[2] = edgeFromPointA[2] + 0.5;
  }

  if (edgeToPointA[0] !== edgeToPointB[0]) {
    edgeToCoordinates[0] = (edgeToPointA[0] + edgeToPointB[0]) / 2;
  } else if (edgeToPointA[0] < edgeFromPointA[0]) {
    edgeToCoordinates[0] = edgeToPointA[0] - 0.5;
  } else {
    edgeToCoordinates[0] = edgeToPointA[0] + 0.5;
  }

  edgeToCoordinates[1] = edgeToPointA[1] - 0.5;

  if (edgeToPointA[2] !== edgeToPointB[2]) {
    edgeToCoordinates[2] = (edgeToPointA[2] + edgeToPointB[2]) / 2;
  } else if (edgeToPointA[2] < edgeFromPointA[2]) {
    edgeToCoordinates[2] = edgeToPointA[2] - 0.5;
  } else {
    edgeToCoordinates[2] = edgeToPointA[2] + 0.5;
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
