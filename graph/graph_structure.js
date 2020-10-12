// First, let us begin with a M x N matrix
// Each element of the matrix is a node and we can

class Graph {

    constructor(m=3, n=3) {
        this.columns = m;
        this.rows = n;
        this.visited = [];
        this.graph = new Map();
        this.goal=-1;
    }
    set_goal(goal){
        this.goal = goal;
    }
    get_graph() {
        console.log(this.graph);
        return this.graph;
    }
    cartesianConnect(origin_node, connections=[]) {
        // origin_node is the point in the matrix being connected
        // connections is an array of numpad style cartesian directions specifying connections
        // Matrix is 0 indexed, but cartesian coordinates are 1-9
        const illegalConnections = this.illegalCartesian(origin_node)
        for(let i=connections.length; i--; i>=0){
            if(illegalConnections.includes(connections[i])) {
                console.log('You attempted to make an illegal connection: '+connections[i]);
                connections.splice(i, 1);
            } else {
                connections[i] = this.convertCartesian(origin_node, connections[i])
            }
        }
        this.graph.set(origin_node, new Set(connections));
    }

    convertCartesian(i, d) {
        if(d < 4){
            i -= this.columns;
        } else if(d > 6) {
            i += this.columns;
        }
        if((d-1) % 3 === 0) {
            i -= 1;
        } else if(d % 3 === 0) {
            i += 1;
        }
        return i;
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
    search(start, depth=true, useH=false, queue=[], steps=0) {
        if(this.goal < 0){
            console.log('No can do...set a goal first');
            return(-1)
        }
        if(queue.length === 0) {
            this.visited = [];
            let t = depth ? 'Depth' : 'Breadth';
            console.log('');
            console.log('STARTING SEARCH: '+ t);
            queue = [[start]];
        }
        steps += 1;
        let to_extend = queue.shift();
        let additions = this.extend(to_extend, depth, useH);
        for(let p of additions) {
            if (!depth || p.includes('TERM')) {
                queue.push(p);
            } else {
                queue.unshift(p);
            }
            if (p.includes(this.goal)) {
                console.log('Path found: ' + p);
                console.log('Required ' + steps + ' steps.');
                console.log('Queue: ');
                console.log(queue)
                return (queue);
            }
        }
        return(this.search(start, depth, useH, queue, steps))
    }
    extend(path=[], depth, useH) {
        // console.log('Visited: '+this.visited)
        let node = path.pop();
        path.push(node);
        if (node === 'TERM'){
            return([path]);
        }
        let output = [];
        let tmp = [];

        for( let n of this.graph.get(node).values() ) {
            let visit = depth ? node : n;
            if (this.visited.includes(visit) && !path.includes(n)) {
                tmp = [...path];
                tmp.push('TERM');
                output.push(tmp);
                // console.log('Path ('+path+') has already been extended elsewhere, dropping from queue.')
            } else if(!path.includes(n)) {
                tmp = [...path]
                tmp.push(n);
                output.push(tmp);
            }
            if (visit === n) {
                this.visited.push(visit);
            }
        }
        this.visited.push(node);

        if(!depth && useH){
            console.log(output)
        }

        if (useH) {
            let g = this.goal;
            let c = this.columns;
            let sorter = this.sorter;
            output.sort(function(x, y){return sorter(x, y, g, c)});
            if (!depth) {
                output = output.slice(0, 2);
            }
        }
        return(output);
    }
    sorter(x, y, g, c){
        let ax = [...x];
        let ay = [...y];
        function heuristicDistance(i, j=-1) {
            if (j < 0){
                j = g;
            }
            let ic = convertLoc2Coord(i);
            let jc = convertLoc2Coord(j);
            let hd = 0;
            for(let x = 0;x < 2; x++){
                hd += Math.abs(ic[x] - jc[x])**2;
            }
            return Math.sqrt(hd);
        }
        function convertLoc2Coord(i) {
            let x = i % c;
            let y = Math.floor(i / c);
            return [x, y];
        }
        let vx = ax.pop();
        let lx = vx === "TERM" ? 1e6 : heuristicDistance(vx);
        let vy = ay.pop();
        let ly = vy === "TERM" ? 1e6 : heuristicDistance(vy);
        if (ly < lx) {
            return -1;
        } else if (ly > lx) {
            return 1;
        } else {
            return 0;
        }
    }
}

export default Graph;
