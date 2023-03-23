export default function Graph() {
  this.nodes = new Map();
}

Graph.prototype.addNode = function (coordinates) {
  const node = JSON.stringify(coordinates);

  if (!this.nodes.has(node)) {
    this.nodes.set(node, []);
  }
};

Graph.prototype.addEdge = function (coordinatesA, coordinatesB) {
  const nodeA = JSON.stringify(coordinatesA);
  const nodeB = JSON.stringify(coordinatesB);

  if (this.nodes.has(nodeA) && this.nodes.has(nodeB)) {
    this.nodes.get(nodeA).push(nodeB);
    this.nodes.get(nodeB).push(nodeA);
  }
};

Graph.prototype.removeEdge = function (coordinatesA, coordinatesB) {
  const nodeA = JSON.stringify(coordinatesA);
  const nodeB = JSON.stringify(coordinatesB);

  if (this.nodes.has(nodeA) && this.nodes.has(nodeB)) {
    this.nodes.set(
      nodeA,
      this.nodes.get(nodeA).filter(edgeNode => edgeNode !== nodeB)
    );
    this.nodes.set(
      nodeB,
      this.nodes.get(nodeB).filter(edgeNode => edgeNode !== nodeA)
    );
  }
};

Graph.prototype.removeNode = function (coordinates) {
  const node = JSON.stringify(coordinates);

  if (this.nodes.has(node)) {
    this.nodes.get(node).forEach(edgeNode => {
      this.nodes.set(
        edgeNode,
        this.nodes.get(edgeNode).filter(edge => edge !== node)
      );
    });
    this.nodes.delete(node);
  }
};

Graph.prototype.contains = function (coordinates) {
  const node = JSON.stringify(coordinates);

  return this.nodes.has(node);
};
