var margin = {
    top: 35,
    bottom: 20,
    left: 40,
    right: 38
  },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {
  var dimensions = d3.keys(data[0]).filter(function(d) { return d != "Species" })
  
  var color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#40BCD8", "#F39237", "#D63230" ])
  
  var y = {}
  
  for (i in dimensions) {
    var name = dimensions[i]
    y[name] = d3.scaleLinear()
                .domain(d3.extent(data, function(d) { return +d[name]; }) )
                .range([height, 0])
  }
  x = d3.scalePoint()
        .range([0,width])
        .domain(dimensions)
  var highlight = function(d) {
    var selected_specie = d.Species
    
    d3.selectAll(".line")
      .transition()
      .duration(300)
      .style("stroke", "lightgrey")
      .style("opacity", 0.3)
    d3.selectAll("." + selected_specie)
      .transition()
      .duration(300)
      .style("stroke", color(selected_specie))
      .style("opacity", 1)    
  }  
  
  var noHighlight = function(d) {
    d3.selectAll(".line")
      .transition()
      .duration(300)
      .delay(1000)
      .style("stroke", function(d) { return ( color(d.Species))})
      .style("opacity", 1)
  }
  
  function path(d) {
    return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]}))
  }
  
  svg.selectAll("paths")
      .data(data)
      .enter()
      .append("path")
      .attr("class", function(d) { return "line " + d.Species})
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function(d) { return( color(d.Species))})
      .style("opacity", .8)
      .on("mouseover", highlight)
      .on("mouseout", noHighlight)
  
  svg.selectAll("axes")
      .data(dimensions)
      .enter()
      .append("g")
      .attr("class", "axis")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"})
      .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d]))})
      .style("opacity", 0.4)      
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d})
      .style("fill", " black")
})  
