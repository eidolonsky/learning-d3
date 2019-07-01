var margin = {
    top: 20,
    bottom: 80,
    left: 50,
    right: 10
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

d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
  function(data) {
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function(d) {
          return d.Country;
        })
      )
      .padding(1);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    var y = d3
      .scaleLinear()
      .domain([0, 13000])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "Bar")
      .attr("x", function(d) {
        return x(d.Country) - 1;
      })
      .attr("y", function(d) {
        return y(d.Value);
      })
      .attr("width", 2)
      .attr("height", function(d) {
        return height - y(d.Value);
      })
      .attr("fill", "#4DA1A9");

    svg
      .append("path")
      .datum(data)
      .attr("class", "Line")
      .attr("fill", "none")
      .attr("stroke", "#2E5077")
      .attr("stroke-width", 3.5)
      .attr(
        "d",
        d3
          .line()
          .x(function(d) {
            return x(d.Country);
          })
          .y(function(d) {
            return y(d.Value);
          })
      );

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "Plot")
      .attr("cx", function(d) {
        return x(d.Country);
      })
      .attr("cy", function(d) {
        return y(d.Value);
      })
      .attr("r", 4)
      .attr("fill", "#C5283D");
    var color = ["#4DA1A9", "#C5283D", "#2E5077"]
    var legend = ["Bar", "Plot", "Line"]
      svg.selectAll("legends")
          .append("g")
          .data(legend)
          .enter()
         .append("text")
         .attr("x", function(d,i) { return width + margin.right - margin.left - 40 * i})
         .attr("y", 10)
         .text(function(d) { return d})
         .style("fill", function(d,i) { return color[i]})
         .style("font-size", 15)
         .on("click", function(d) {
        textLine = d3.select(this).style("text-decoration")
        console.log(textLine)
        d3.select(this).style("text-decoration", textLine == "line-through" ? "none":"line-through" )
        currentOpacity = d3.selectAll("." + d).style("opacity")
        d3.selectAll("." + d).transition().duration(1000).style("opacity", currentOpacity == 1? 0:1)
      })
  });
