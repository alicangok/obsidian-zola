var container = document.getElementById("graph");

var nodes = new vis.DataSet(graph_data.nodes)
var edges = new vis.DataSet(graph_data.edges)

function isDark() {
	return localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia("(prefers-color-scheme: dark)").matches)
}

var options = {
	nodes: {
		shape: "dot",
		font: {
			face: "Source Sans Pro",
		},
		chosen: {
			node: function(values, id, selected, hovering) {
    				values.color = "blue";
  				},
			label: function(values, id, selected, hovering) {
    				values.color = "blue";
  				}
		},
		scaling: {
			label: {
				enabled: true
			}
		}
	},
	edges: {
		color: { inherit: "both" },
		chosen: {
			label: function(values, id, selected, hovering) {
    				values.color = "blue";
  				}
		},
		width: 4,
		smooth: {
			type: "continuous",
		},
	},
	interaction: {
		hover: true
	},
};

var graph = new vis.Network(container, {
	nodes: nodes,
	edges: edges
}, options);

graph.on("selectNode", function (params) {
	// console.log(params);
	if (params.nodes.length === 1) {
		var node = nodes.get(params.nodes[0]);
		window.open(node.url, "_blank");
	}
});
