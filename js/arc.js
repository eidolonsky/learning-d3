var width = 400, height = 400, margin = 30;

var radius = Math.min(width, height) / 2 - margin;

var svg = d3.select("#my_datavis")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var data = {a: 1, b: 3, c:5, d:8, e:12}

var color = ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"]
var color2 = ["#1A535C", "#4ECDC4", "#B8B8D1", "#FF6B6B", "#FFE66D"]


var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius-80)
var arcGenerator2 = d3.arc()
  .innerRadius(100)
  .outerRadius(radius)

svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr("stroke", "none")
    .attr("fill", function(d,i) { return color[i]})
    .style("stroke-width", "2px")

svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append("text")
  .text(function(d) { return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")"})
  .style("text-anchor", "middle")
  .style("font-size", 17)

svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator2)
    .attr("stroke", "none")
    .attr("fill", function(d,i) { return color2[i]})
    .style("stroke-width", "2px")

svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append("text")
  .text(function(d) { return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator2.centroid(d) + ")"})
  .style("text-anchor", "middle")
  .style("font-size", 17)
