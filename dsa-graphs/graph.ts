class GraphNode {
  value: any
  adjacent: Set<GraphNode>

  constructor(value, adjacent = new Set<GraphNode>()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  nodes: Set<GraphNode>
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(node => {
      this.nodes.add(node)
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1: GraphNode, v2: GraphNode) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1: GraphNode, v2: GraphNode) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacenct lists that include that vertex
  removeVertex(vertex) {
    this.nodes.forEach(node => {
      if(node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex)
      }
    })
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start: GraphNode) {
    const visited = new Set<GraphNode>().add(start)
    const stack: GraphNode[] = [start]
    const data: any[] = []

    while (stack.length) {
      const node = stack.pop()
      data.push(node?.value)

      node?.adjacent.forEach(adj => {
        if(!visited.has(adj)) {
          stack.push(adj)
          visited.add(adj)
        }
      })
    }
    return data
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set<GraphNode>().add(start)
    const queue: GraphNode[] = [start]
    const data: any[] = []

    while (queue.length) {
      const currentVertex = queue.shift()
      data.push(currentVertex?.value)

      currentVertex?.adjacent.forEach(adj => {
        if (!visited.has(adj)) {
          visited.add(adj)
          queue.push(adj)
        }
      })
    }
    return data
  }
}

module.exports = {Graph, GraphNode}