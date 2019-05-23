/* Gradient Color */
var svg = d3.selectAll(".tile")
            .append("svg")
            .attr("width", 800)
            .attr("height", 400);

var data = [];

for (var i=0; i<15; i++) {
  data.push(i+1)
}


var gColor = d3.scaleLinear()
                .domain([1, 15])
                .range(["#41337A", "#C2EFEB"]);

svg.selectAll("circle")
   .data(data).enter()
   .append("circle")
   .attr("cy", 200)
   .attr("cx", function(i, d) {
    return (30 + i) * i;
   })
   .attr("r", function(d) {
    return d;
   })
   .attr("fill", function(d) {
    return gColor(d)
   });