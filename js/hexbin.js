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

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv", function(data) {
  
  var x = d3.scaleLinear()
         .domain([5, 18])
         .range([0, width])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  
  var y = d3.scaleLinear()
          .domain([5,20])
          .range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(y))
  
  var fData1=[], fData2=[], fData3 = []
  data.forEach(function(d) {
   if(d.group === "A") {
     fData1.push( [x(d.x), y(d.y)]) 
   }    
   else if(d.group === "B") {
     fData2.push( [x(d.x), y(d.y)]) 
   } 
   else {
     fData3.push( [x(d.x), y(d.y)]) 
   } 
  })
  var dataArr = [fData1, fData2, fData3]

  var colorArr = ["#C73E1D", "#035E7B", "#7E1F86"]
 
  var hexbin = d3.hexbin()
            .radius(3)
            .extent([[0, 0], [width, height]])
  
  svg.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
  for(var i=0;i < 3; i++) { 
    var color = d3.scaleLinear()
            .domain([0, 90])
            .range(["transparent", colorArr[i]])
    svg.append("g")
      .attr("clip-path", "url(#clip)")
      .selectAll("path")
      .data( hexbin(dataArr[i]))
      .enter()
      .append("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"})
      .attr("fill", function(d) { return color(d.length)})
      .attr("stroke", "black")
      .attr("stroke-width", "0.1")
  }  
})
