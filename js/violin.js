var margin = {
    top: 10,
    bottom: 30,
    left: 30,
    right: 40
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

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {
  var y =d3.scaleLinear()
           .domain([3.5, 8])
           .range([height, 0])
  svg.append("g")
      .call(d3.axisLeft(y))
  
  var x = d3.scaleBand()
            .domain(["setosa", "versicolor", "virginica"])
            .range([0, width])
            .padding(0.05)
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
  var colorArr = ["#540d6e", "#ee4266","#ffd23f"]
  var color = d3.scaleSequential()
                .interpolator(d3.interpolateInferno)
                .domain([3,9])
  
  var histogram = d3.histogram()
                    .domain(y.domain())
                    .thresholds(y.ticks(20))
                    .value(d => d)
  
  var sumstat = d3.nest()
                  .key(function(d) { return d.Species})
                  .rollup(function(d) {
                     input = d.map(function(g) { return g.Sepal_Length})
                     bins = histogram(input)
                     return(bins)
                   })
                  .entries(data)
  
  var maxNum = 0
  for (i in sumstat) {
    allBins = sumstat[i].value
    lengths = allBins.map(function(a) { return a.length})
    longuest = d3.max(lengths)
    if (longuest > maxNum) { maxNum = longuest}
  }
  
  var xNum = d3.scaleLinear()
               .range([0, x.bandwidth()])
               .domain([-maxNum, maxNum])

  svg.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return(x(d.Species) + x.bandwidth()/2 - Math.random()*40)})
        .attr("cy", function(d) { return(y(d.Sepal_Length))})
        .attr("r", 5)
        .style("fill", function(d) { return(color(d.Sepal_Length))})
        .attr("stroke", "white")  
  
  svg.selectAll("violins")
      .data(sumstat)
      .enter()
      .append("g")
      .attr("transform", function(d) { return("translate(" + x(d.key) +" ,0)")})
      .append("path")
      .datum(function(d) { return(d.value)})
      .style("stroke", "none")
      .style("fill", function(d,i) { return colorArr[i] })
      .style("opacity", 0.5)
      .attr("d", d3.area()
           .x0(xNum(0))
           .x1(function(d) { return(xNum(d.length))})
           .y(function(d) { return(y(d.x0))})
           .curve(d3.curveCatmullRom))
})
