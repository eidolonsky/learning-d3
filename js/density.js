var margin = {
    top: 20,
    bottom: 35,
    left: 50,
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

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {
  
  var x = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width])
  svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
  
  var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 0.01])
  svg.append("g")
     .call(d3.axisLeft(y))
  
  var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
  var density = kde(data.map(function(d) { return d.price }))
  
  var curve = svg.append("g")
                 .append("path")
                 .attr("class", "paths")
                 .datum(density)
                 .attr("fill", "#69b3a2")
                 .attr("opacity", 0.8)
                 .attr("stroke", "#000")
                 .attr("stroke-width", 1)
                 .attr("stroke-linejoin", "round")
                 .attr("d", d3.line()
                              .curve(d3.curveBasis)
                              .x(function(d) { return x(d[0])})
                              .y(function(d) { return y(d[1])})
                      )
  
  function updateChart(binNumber) {
    
    kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
    density = kde( data.map(function(d) { return d.price }))
    
    curve.datum(density)
         .transition()
         .duration(1000)
         .attr("d", d3.line()
                      .curve(d3.curveBasis)
                      .x(function(d) { return x(d[0])})
                      .y(function(d) { return y(d[1])})
              )
  }
  
  d3.select("#slider")
    .on("change", function(d) {
    selectedValue = this.value
    updateChart(selectedValue)
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
    return Math.abs(v /= k) <= 1 ? 0.75*(1 - v*v) / k : 0
  }
}
