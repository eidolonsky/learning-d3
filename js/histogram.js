var margin = {
    top: 20,
    bottom: 30,
    left: 30,
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

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv", function(data) {
  var x = d3.scaleLinear()
         .domain([-4, 9])
         .range([0, width])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  
  var histogram = d3.histogram()
      .value(function(d) { return +d.value})
      .domain(x.domain())
      .thresholds(x.ticks(40))
  
  var bins1 = histogram(data.filter( function(d) { return d.type === "variable 1"}))
  var bins2 = histogram(data.filter( function(d) { return d.type === "variable 2"}))  
  
  var y = d3.scaleLinear()
        .range([height, 0])
  y.domain([0,d3.max(bins1, function(d) { return d.length})])
  svg.append("g")
     .call(d3.axisLeft(y))
  
  svg.selectAll("rect")
    .data(bins1)
    .enter()
    .append("rect")
    .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1 ; })
        .attr("height", function(d) { return height - y(d.length); })
    .style("fill", "#F19A3E")
    .style("opacity", 0.6)
  
  svg.selectAll("rect2")
    .data(bins2)
    .enter()
    .append("rect")
    .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1 ; })
        .attr("height", function(d) { return height - y(d.length); })
    .style("fill", "#DB5461")
    .style("opacity", 0.6)
    
   svg.append("circle").attr("cx",280).attr("cy",30).attr("r", 6).style("fill", "#F19A3E")
  svg.append("circle").attr("cx",280).attr("cy",60).attr("r", 6).style("fill", "#DB5461")
  svg.append("text").attr("x", 290).attr("y", 30).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 290).attr("y", 60).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")
})  
