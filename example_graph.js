import Graph from './graph/graph_structure.js';

let classExample = new Graph(4, 3);
classExample.cartesianConnect(1, [6, 8]);
classExample.cartesianConnect(2, [4]);
classExample.cartesianConnect(5, [2, 8]);
classExample.cartesianConnect(7, [7]);
classExample.cartesianConnect(8, [3, 6]);
classExample.cartesianConnect(9, [2, 4, 6]);
classExample.cartesianConnect(10, [3,4]);
classExample.get_graph();

