var margin = {
    top: 70,
    bottom: 70,
    left: 70,
    right: 70
  },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


//https://www.d3-graph-gallery.com/graph/bubble_template.html

var svg8 = d3
  .select("#my_datavis")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {
  var x = d3.scaleLinear()
            .domain([0, 45000])
            .range([0, width])
  svg8.append("g")
      .attr("transform", "translate(0, " + height + ")")
      .call(d3.axisBottom(x).ticks(5))

  svg8.append("text")
     .attr("text-anchor", "end")
     .attr("x", width - 90)
     .attr("y", height + 45)
     .attr("font-size", 12)
     .text("GDP per capita")
  
  var y = d3.scaleLinear()
            .domain([ 40, 80 ])
            .range([ height, 0 ])
  svg8.append("g")
      .call(d3.axisLeft(y))
  
  var highlight = function(d) {
    d3.selectAll(".bubbles")
      .style("opacity", 0.1)
    d3.selectAll("."+d)
      .style("opacity", 1)
  }
  
  var nohighlight = function(d) {
    d3.selectAll(".bubbles")
      .style("opacity", 1)
  }
  
  svg8.append("text")
     .attr("text-anchor", "end")
     .attr("x", 0)
     .attr("y", -20)
     .text("Life Expectancy")
     .attr("font-size", 12)  
     .attr("text-anchor", "start")
  
  var z = d3.scaleSqrt()
            .domain([ 200000, 1310000000 ])
            .range([ 2, 30 ])
  
  var colorArr = ["#F17878", "#B1ECBD", "#FFC66A", "#458FCD", "#5DC4A8"]
  var groups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
  var color = d3.scaleOrdinal()
                  .domain(groups)
                  .range(colorArr);
  svg8.append("rect")
      .attr("x", 210)
      .attr("y", 80)
      .attr("width", 100)
      .attr("height", 165)
      .style("fill", "none")
      .style("stroke", "#081200")
      .style("stroke-width", 0.5)
  
   var countries = d3.select("body")
       .append("div")
       .style("position", "absolute")
       .style("z-index", "10")
       .style("visibility", "hidden")
       .style("background-color", "#000000")
       .style("color", "#FFFFFF")
       .style("font-size", 8)
       .style("padding", "5px")
       .style("border", "solid")
       .style("border-radius", "50px");

  var mouseover = function(d) { 
    countries.style("visibility", "visible")
    countries.html(d.country)
             .style("left", (event.pageX+5)+"px")
             .style("top", (event.pageY+5) + "px")    
  }
  var mousemove = function(d,i) {
    countries.html(d.country)
             .style("left", (event.pageX+5)+"px")
             .style("top", (event.pageY+5) + "px")
  }
  var mouseleave = function(d) {
     countries.style("visibility", "hidden")
  }  
  
  svg8.append("g")
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", function(d) { return "bubbles " + d.continent})
     .attr("cx", function(d) { return x(d.gdpPercap)})
     .attr("cy", function(d) { return y(d.lifeExp)})
     .attr("r", function(d) { return z(d.pop)})
     .style("fill", function(d) { return color(d.continent)})
     .style("stroke", "#ffffff")
     .style("opacity", 0.95)
     .on("mouseover", mouseover)
     .on("mouseout", mousemove)
     .on("mouseleave", mouseleave)
  var legends = [10000000, 100000000, 1000000000]
  var xLegend = 250
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("circle")
      .attr("cx", xLegend)
      .attr("cy", function(d) { return height - 40 - z(d)})
      .attr("r", function(d) { return z(d)})
      .style("fill", "none")
      .style("stroke", "#000000")
      .style("stroke-width", 0.5)
  
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("line")
      .attr("x1", function(d) { return xLegend + z(d) })
      .attr("y1", function(d) { return height - 40 - z(d)})
      .attr("x2", 285)
      .attr("y2", function(d) { return height - 40 - z(d)})
      .attr("stroke", "#000000")
      .style("stroke-dasharray", ("2, 2"))      
      .style("stroke-width", 0.5)
  
  svg8.selectAll("legend")
      .data(legends)
      .enter()
      .append("text")
      .attr("x", 285)
      .attr("y", function(d) { return height - 40 - z(d)})
      .text( function(d) { return d/1000000})
      .style("font-size", 8)
      .attr("alignment-baseline", "middle")

  svg8.append("text")
      .attr("x", xLegend)
      .attr("y", height - 20)
      .text("Population (M)")
      .style("font-size", 9.5) 
      .attr("text-anchor", "middle")
  
  var size = 20
  svg8.selectAll("rects")
      .data(groups)
      .enter()
      .append("circle")
      .attr("cx", 222)
      .attr("cy", function(d, i) { return 90 + i * 15})
      .attr("r", 6)
      .style("fill", function(d) { return color(d)})
      .on("mouseover", highlight)
      .on("mouseleave", nohighlight)
  
  svg8.selectAll("labels")
      .data(groups)
      .enter()
      .append("text")
      .text(function(d) { return d })
      .style("font-size", 9)
      .attr("x", 235)
      .attr("y", function(d, i) { return 90 + i * 15})
      .attr("alignment-baseline", "middle")
      .style("fill", function(d) { return color(d)})
      .on("mouseover", highlight)
      .on("mouseleave", nohighlight)
})  
