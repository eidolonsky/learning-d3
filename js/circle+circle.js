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

var ranColor = ["#3B1F2B", "#DB162F", "#DBDFAC", "#5F758E", "#383961"];
var i, n, m;
var data = [];
for (i = 1; i < 6; i++) {
  data.push(i * 4);
}
for (n = 15; n < 360; n = n + 50) {
  for (m = 15; m < 360; m = m + 50) {
    svg
      .selectAll("myCircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", n + 20)
      .attr("cy", m + 20)
      .attr("r", function(d) {
        return d;
      })
      .attr("stroke", function(d) {
        return ranColor[Math.floor(Math.random() * ranColor.length)];
      })
      .attr("stroke-width", function(d) {
        return Math.random() * 3;
      })
      .attr("fill", "none");
  }
}
