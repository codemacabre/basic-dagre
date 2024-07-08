// Import libraries
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';

// Set up svg with D3
const svg = d3.select('#graph').attr('width', window.innerWidth).attr('height', window.innerHeight);
const inner = svg.append('g');

// Add zoom support
const zoom = d3.zoom().on('zoom', (element) => {
  inner.attr('transform', element.transform);
});
svg.call(zoom);

// Set up graph
const graph = new dagreD3.graphlib.Graph().setGraph({ rankDir: 'LR' });

// Draw nodes and edges
graph.setNode(0, { label: 'A' });
graph.setNode(1, { label: 'B' });
graph.setEdge(0, 1, { label: 'to' });

// Render graph
const render = new dagreD3.render();
render(inner, graph);

// Get width and height of graph and svg element
const bounds = inner.node().getBBox();
const width = svg.attr('width');
const height = svg.attr('height');

// Centre and scale graph to fit page
svg.call(
  zoom.transform,
  d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(Math.min(width / bounds.width, height / bounds.height))
    .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2)
);
