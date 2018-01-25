var network = null;
var layoutMethod = "directed";

// using 400 and 200 from GoogleMD

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
            /* change the color of the clicked node
                possible problems:
                    1. if a node had already been clicked, after other actions clicking the same node results in 'reset' of the graph. try clicking 1022, then 2030, then 1022 ----> notice now 2030 is green although we've already clicked it before!!!
            */
            var clickedNode = nodes.get(nodeID);
            clickedNode = changeNodeColor(null, clickedNode, 'tookColor');
            nodes.update(clickedNode);

            // allow user to see the courses they could take/set courses they cant take to black
            var someEdges = network.getConnectedEdges(nodeID);
            for (var i=0; i<someEdges.length; i++){
                var someEdge = edges.get(someEdges[i]);
                someEdge = makeEdgeVisible(someEdge);
                edges.update(someEdge);

                // set the color of courses they can take to green
                var toNodeID = someEdge['to'];
                if (toNodeID !== nodeID) {
                    //console.log(someEdge['to']);
                    var connectedNode = nodes.get(toNodeID);
                    connectedNode = changeNodeColor(network, connectedNode, 'couldTakeColor', network.getConnectedEdges(toNodeID));
                    nodes.update(connectedNode);
                } else {

                    // set the color of the courses they cant take to red, propagate through all the nodes backwards to highlight them red
                    propagateBackwardToShowPrerequisites(network, nodes, edges, someEdge);
                }
            }

        }
    });

}
