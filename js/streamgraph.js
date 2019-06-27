var margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
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

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function(data) {
  var keys = data.columns.slice(1)
  var x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.year; }))
            .range([ 0, width ])
          svg.append("g")
              .attr("transform", "translate(0," + height * 0.8 + ")")
              .call(d3.axisBottom(x).tickSize(height * -0.7).tickValues([1900, 1925, 1975, 2000]))
              .select(".domain").remove()
          svg.selectAll(".tick line")
             .attr("stroke", "#B8B8B8")
  
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height-30 )
      .text("Time (year)")
      .attr("font-size", 9)
  
  var y = d3.scaleLinear()
            .domain([-95000, 95000])
            .range([ height, 0])
  
  var colorArr = ["#540d6e", "#ee4266","#ffd23f","#0BC9CD"]
  var color = d3.scaleOrdinal()
            .domain(keys)
            .range(colorArr)
  
  var stackedData = d3.stack()
                      .offset(d3.stackOffsetSilhouette)
                      .keys(keys)
                      (data)
  
  var area = d3.area()
                .x(function(d) { return x(d.data.year)})
                .y0(function(d) { return y(d[0])})
                .y1(function(d) { return y(d[1])})
 
var tooltip = svg.append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .style("opacity", 0)
                    .style("fontsize", 17)
  
  var mouseover = function(d) { 
    tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", 0.2)
    d3.select(this)
       .style("stroke", "#FFFFFF")
       .style("opacity", 1)  
  }
  var mousemove = function(d,i) {
    grp = keys[i]
    tooltip.text(grp)
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
  }  
  
  svg.selectAll("mylayers")
     .data(stackedData)
     .enter()
     .append("path")
     .attr("class", "myArea")
     .style("fill", function(d) { return color(d.key)})
     .attr("d", area)
     .on("mouseover", mouseover)
     .on("mousemove", mousemove)
     .on("mouseleave", mouseleave)
})
