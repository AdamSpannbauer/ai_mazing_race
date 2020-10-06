// First, let us begin with a M x N matrix
// Each element of the matrix is a node and we can

class Graph {
    constructor(m=3, n=3) {
        this.columns = m;
        this.rows = n;
        this.graph = new Map();
    }
    get_graph() {
        console.log(this.graph);
    }
    cartesianConnect(origin_node, connections=[]) {
        // origin_node is the point in the matrix being connected
        // connections is an array of numpad style cartesian directions specifying connections
        // Matrix is 0 indexed, but cartesian coordinates are 1-9
        const illegalConnections = this.illegalCartesian(origin_node)
        for(let i=connections.length-1; i--; i>=0){
            if(illegalConnections.includes(connections[i])) {
                console.log('You attempted to make an illegal connection: '+connections[i]);
                connections.splice(i, 1);
            }
        }
        this.graph.set(origin_node, new Set(connections));
    }
    illegalCartesian(i = 0) {
        let illegalConnections = [];
        if(i < this.columns) {
            illegalConnections.push(1, 2, 3);
        }
        if(i >= (this.columns*this.rows-this.columns)) {
            illegalConnections.push(7, 8, 9);
        }
        if(i % this.columns === 0) {
            illegalConnections.push(1, 4, 7);
        }
        if((i+1) % this.columns === 0) {
            illegalConnections.push(3, 6, 9);
        }
        return illegalConnections;
    }
}

export default Graph;
