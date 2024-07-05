import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';

// Create graph
const g = new dagreD3.graphlib.Graph();
g.setGraph({});

// Create nodes
g.setNode(0, { label: 'A' });
g.setNode(1, { label: 'B' });

// Create edges
g.setEdge(0, 1, { label: 'Test' });

// Create renderer
const render = new dagreD3.render();

// Target svg and create group
const svg = d3.select('svg').attr('width', window.innerWidth).attr('height', window.innerHeight);
const inner = svg.append('g');

// Set up zoom support
const zoom = d3.zoom().on('zoom', (element) => {
  inner.attr('transform', element.transform);
});
svg.call(zoom);

// Run renderer
render(inner, g);

const bounds = inner.node().getBBox();
const width = svg.attr('width');
const height = svg.attr('height');
svg.call(
  zoom.transform,
  d3.zoomIdentity
    // Centre graph
    .translate(width / 2, height / 2)
    // Scale graph to svg element
    .scale(Math.min(width / bounds.width, height / bounds.height))
    // Fit graph to svg element
    .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2)
);
