export default function Graph() {
  this.nodes = new Map();
}

Graph.prototype.addNode = function (position) {
  const node = JSON.stringify(position);

  if (!this.nodes.has(node)) {
    this.nodes.set(node, []);
  }
};

Graph.prototype.addEdge = function (positionA, positionB) {
  const nodeA = JSON.stringify(positionA);
  const nodeB = JSON.stringify(positionB);

  if (this.nodes.has(nodeA) && this.nodes.has(nodeB)) {
    this.nodes.get(nodeA).push(nodeB);
    this.nodes.get(nodeB).push(nodeA);
  }
};

Graph.prototype.removeEdge = function (positionA, positionB) {
  const nodeA = JSON.stringify(positionA);
  const nodeB = JSON.stringify(positionB);

  if (this.nodes.has(nodeA) && this.nodes.has(nodeB)) {
    this.nodes.set(
      nodeA,
      this.nodes.get(nodeA).filter(edge => edge !== nodeB)
    );
    this.nodes.set(
      nodeB,
      this.nodes.get(nodeB).filter(edge => edge !== nodeA)
    );
  }
};

Graph.prototype.removeNode = function (position) {
  const node = JSON.stringify(position);

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
