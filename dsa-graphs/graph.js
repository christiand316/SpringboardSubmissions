var Node = /** @class */ (function () {
    function Node(value, adjacent) {
        if (adjacent === void 0) { adjacent = new Set(); }
        this.value = value;
        this.adjacent = adjacent;
    }
    return Node;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = new Set();
    }
    // this function accepts a Node instance and adds it to the nodes property on the graph
    Graph.prototype.addVertex = function (vertex) {
        this.nodes.add(vertex);
    };
    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    Graph.prototype.addVertices = function (vertexArray) {
        var _this = this;
        vertexArray.forEach(function (node) {
            _this.nodes.add(node);
        });
    };
    // this function accepts two vertices and updates their adjacent values to include the other vertex
    Graph.prototype.addEdge = function (v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    };
    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    Graph.prototype.removeEdge = function (v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    };
    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacenct lists that include that vertex
    Graph.prototype.removeVertex = function (vertex) {
        this.nodes.forEach(function (node) {
            if (node.adjacent.has(vertex)) {
                node.adjacent.delete(vertex);
            }
        });
        this.nodes.delete(vertex);
    };
    // this function returns an array of Node values using DFS
    Graph.prototype.depthFirstSearch = function (start) {
        var visited = new Set().add(start);
        var stack = [start];
        var data = [];
        while (stack.length) {
            var node = stack.pop();
            data.push(node === null || node === void 0 ? void 0 : node.value);
            node === null || node === void 0 ? void 0 : node.adjacent.forEach(function (adj) {
                if (!visited.has(adj)) {
                    stack.push(adj);
                    visited.add(adj);
                }
            });
        }
        return data;
    };
    // this function returns an array of Node values using BFS
    Graph.prototype.breadthFirstSearch = function (start) {
        var visited = new Set().add(start);
        var queue = [start];
        var data = [];
        while (queue.length) {
            var currentVertex = queue.shift();
            data.push(currentVertex === null || currentVertex === void 0 ? void 0 : currentVertex.value);
            currentVertex === null || currentVertex === void 0 ? void 0 : currentVertex.adjacent.forEach(function (adj) {
                if (!visited.has(adj)) {
                    visited.add(adj);
                    queue.push(adj);
                }
            });
        }
        return data;
    };
    return Graph;
}());
module.exports = { Graph: Graph, Node: Node };
