var network = null;
var layoutMethod = "directed";

function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw() {
    destroy();

    var nodesResponse = getNodes();
    var nodes = new vis.DataSet(nodesResponse);
    var edgesResponse = getEdges();
    var edges = new vis.DataSet(edgesResponse);

    // create a network
    var container = document.getElementById('display');
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        layout: {
            hierarchical: {
                sortMethod: layoutMethod,
                levelSeparation: 125,
                nodeSpacing: 0,
                treeSpacing: 1,
                blockShifting: false,
                direction: 'LR'       // UD, DU, LR, RL
            }
        },
        nodes: {
            borderWidth: 2,
            color: {
                background: '#FFF'
            }
        },
        edges: {
            smooth: true,
            arrows: {to : true }
        }
    };

    network = new vis.Network(container, data, options);

    network.on("click", function(params) {
        var nodeID = params['nodes']['0'];
        if (nodeID) {
            var clickedNode = nodes.get(nodeID);
            clickedNode = changeNodeColor(clickedNode, '#FB8C00', '#FFB74D');
            nodes.update(clickedNode);

            var someEdges = network.getConnectedEdges(nodeID);
            for (var i=0; i<someEdges.length; i++){
                var someEdge = edges.get(someEdges[i]);
                someEdge = makeEdgeVisible(someEdge);
                edges.update(someEdge);
                //console.log(someEdge);

                var connectedNodeID = someEdge['to'];
                if (connectedNodeID !== nodeID) {
                    console.log(someEdge['to']);
                    var connectedNode = nodes.get(connectedNodeID);
                    connectedNode = changeNodeColor(connectedNode, '#262', null);
                    nodes.update(connectedNode);
                }
                

            }

        }
    });

}
