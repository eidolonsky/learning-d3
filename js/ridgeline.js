var margin = {
    top: 65,
    bottom: 35,
    left: 115,
    right: 25
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

d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {
  var categories = data.columns
  var n = categories.length
  var color = ["#b0ebf8","#28c9ed","#023047","#ffb701","#fc8500","#03256c","#ff6b35","#f7c59f","#efefd0","#1a659e","#003d5b","#30638e","#2299b4","#edae49","#d1495b","#ffb923","#f1e9db"]
  var x = d3.scaleLinear()
            .domain([-10, 140])
            .range([0, width])
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("class", "axis")

  var y=d3.scaleLinear()
          .domain([0, 0.4])
          .range([height, 0])
  
  var yName = d3.scaleBand()
                .domain(categories)
                .range([0, height])
                .paddingInner(1)
  svg.append("g")
     .attr("class", "yaxis")
     .call(d3.axisLeft(yName))

  var ytick = svg.selectAll(".yaxis").selectAll(".tick")
  
  ytick.on("mouseover", function(d) {
      myarea.attr("fill-opacity", .3)
      d3.select(this).attr("font-weight", "bold").style("color", "#51ff00")
      d3.select("."+d3.select(this).text().replace(/\s+/g, '')).attr("fill-opacity", 1)
  })
        .on("mouseout", function(d) {
      myarea.attr("fill-opacity", .9)
      d3.select(this).attr("font-weight", null).style("color", "#000")   
  })
  
  var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100))
  
  var allDensity = []
  
  for (i=0; i< n; i++) {
    key = categories[i]
    density = kde(data.map(function(d) { return d[key]}))
    allDensity.push({key:key, density:density})
  }
  
  var myarea = svg.selectAll("areas")
    .data(allDensity)
    .enter()
    .append("path")
    .attr("class", function(d,i) { return categories[i].replace(/\s+/g, '')} )
    .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
    .datum(function(d){return(d.density)})
    .attr("fill", function(d, i) { return color[i] })
    .attr("stroke", "#345943")
    .attr("stroke-width", 1)
    .attr("opacity", .9)
    .attr("d", d3.line()
                   .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
           )
    .on("mouseover", function(d) {
      d3.select(this).attr("stroke-width", d3.select(this).attr("stroke-width") == 1 ? 3 : 1)
  })
    .on("mouseout", function(d) {
      d3.select(this).attr("stroke-width", 1)
    })
})      

function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v)})]
    })
  }
}

function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0
  }
}
