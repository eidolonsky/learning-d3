var margin = {
    top: 15,
    bottom: 25,
    left: 30,
    right: 15
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

var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

var x = d3.scaleBand()
       .range([0, width])
       .domain(myGroups)
       .padding(0.01)
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

var y = d3.scaleBand()
       .range([height, 0])
       .domain(myVars)
       .padding(0.01)
svg.append("g")
  .call(d3.axisLeft(y))

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
 
  var max = d3.max(data, function(d) { return +d.value})
  console.log(max)
  var color = d3.scaleLinear()
    .range(["#F5E7F8", "#4F5C8C"])
    .domain([1,max])

  svg.selectAll()
    .data(data, function(d) {
    return d.group + ":" + d.variable
  })
    .enter().append("rect")
         .attr("x", function(d) { return x(d.group)})
         .attr("y", function(d) { return y(d.variable)})
         .attr("width", x.bandwidth())
         .attr("height", y.bandwidth())
         .attr("fill", function(d) {
            return color(d.value)
  })
         .on("mouseover", function(d) { return tooltip.style("visibility", "visible") })
         .on("mousemove", function(d) { return tooltip.html("The value of this cell is " + d.value).style("top", (event.pageY + 25)+"px").style("left",(event.pageX)+"px").style("font-size", "10px").style("opacity", 0.85)})
         .on("mouseout", function(d) { return tooltip.style("visibility", "hidden")})
  
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "#E8EEED")
    .style("padding", "5px")
    .style("border", "solid")
    .style("border-color", "#D2DEDB")
    .style("border-width", "0.5px")
    .style("border-radius", "5px");
})
