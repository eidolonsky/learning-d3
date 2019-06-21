var margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv", function(data) {
  var root = d3.stratify()
     .id(function(d) { return d.name })
     .parentId(function(d) { return d.parent})
     (data);
  
  root.sum(function(d) { return +d.value })
  
  d3.treemap()
    .size([width, height])
    .padding(4)
   (root)
console.log(root.leaves())
  
  svg.selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", function(d) { return d.x0; })
    .attr("y", function(d) { return d.y0; })
    .attr("width", function(d) { return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .attr("stroke", "#FAA381")
    .attr("stroke-width", 1.5)
    .attr("fill", "#F5CDA7")
  
  svg.selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x0 + 10})
    .attr("y", function(d) { return d.y0 + 20})
    .text(function(d) { return d.data.value})
    .attr("font-size", "15px")
    .attr("fill", "#495867")
});
