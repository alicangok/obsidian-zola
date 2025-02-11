// Query dark mode setting
function isDark() {
	return localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

// Get URL of current page and also current node
var curr_url = decodeURI(window.location.href.replace(location.origin, ""));
if (curr_url.endsWith("/")) {
	curr_url = curr_url.slice(0, -1);
}

// Get graph element
var container = document.getElementById("graph");

// Parse nodes and edges
try {
	var curr_node = graph_data.nodes.filter((node) => decodeURI(node.url) == curr_url);
} catch (error) {
	var curr_node = null;
}
var nodes = null;
var edges = new vis.DataSet(graph_data.edges);

if (curr_node.length > 0) {
	curr_node = curr_node[0];

	// Get nodes connected to current
	var connected_nodes = graph_data.edges
		.filter((edge) => edge.from == curr_node.id || edge.to == curr_node.id)
		.map((edge) => {
			if (edge.from == curr_node.id) {
				return edge.to;
			}
			return edge.from;
		});

	if (graph_is_local) {
		nodes = new vis.DataSet(graph_data.nodes.filter((node) => node.id == curr_node.id || connected_nodes.includes(node.id)));
	} else {
		nodes = new vis.DataSet(graph_data.nodes);
	}
} else {
	curr_node = null;
	nodes = new vis.DataSet(graph_data.nodes);
}

// Get nodes and edges from generated javascript
var max_node_val = Math.max(...nodes.map((node) => node.value));

// Highlight current node and set to center
if (curr_node) {
	nodes.update({
		id: curr_node.id,
		// value: Math.max(4, max_node_val * 2.5),
		// shape: "star",
		color: "#1155EE",
		font: {
			strokeWidth: 1,
		},
		x: 0,
		y: 0,
	});
}

// Construct graph
var options = {
	nodes: {
		shape: "dot",
		color: isDark() ? "#8c8e91" : "#dee2e6",
		font: {
			face: "Source Sans Pro",
			color: isDark() ? "#c9cdd1" : "#616469",
			strokeColor: isDark() ? "#c9cdd1" : "#616469",
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
				enabled: true,
			},
			min: 6,
			max: 12,
		},
	},
	edges: {
		color: {
			color: "gray",
			highlight: "blue",
			hover: "blue"	
		},
		width: 0.8,
		smooth: {
			type: "continuous",
		},
		hoverWidth: 4,
	},
	interaction: {
		hover: true,
	},
	height: "100%",
	width: "100%",
	physics: {
		solver: "repulsion",
    		// repulsion: {
      		//	springLength: 120
    		// },		
	},
};

var graph = new vis.Network(
	container,
	{
		nodes: nodes,
		edges: edges,
	},
	options
);

// Clickable URL
graph.on("selectNode", function (params) {
	if (params.nodes.length === 1) {
		var node = nodes.get(params.nodes[0]);
		if (graph_link_replace) {
			window.open(node.url, "_self");
		} else {
			window.open(node.url, "_blank");
		}
	}
});

// Focus on current node + scaling
graph.once("afterDrawing", function () {
	if (curr_node) {
		if (!graph_is_local) {
			graph.focus(curr_node.id, {
				scale: graph.getScale() * 1.8,
			});
		}
		else { graph.focus(curr_node.id, {
				scale: graph.getScale() * 0.9,
		});
		}
	} else {
		var clientHeight = container.clientHeight;
		graph.moveTo({
			position: {
				x: 0,
				y: -clientHeight / 20,
			},
			scale: graph.getScale() * 1,
		});
	}
});
