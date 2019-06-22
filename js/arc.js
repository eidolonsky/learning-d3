var margin = {
    top: 20,
    bottom: 20,
    left: 20,
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

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json", function(data) {
  var allNodes = data.nodes.map(function(d) { return d.name })
  
  var x = d3.scalePoint()
        .range([0,width])
        .domain(allNodes)
  
  var labels = svg.selectAll("labels")
    .data(data.nodes)
    .enter()
    .append("text")
    .attr("x", function(d) { return x(d.name)})
    .attr("y", height / 1.75 + 30)
    .text(function(d) { return(d.name)})
    .attr("text-anchor", "middle")
    .on("mouseover", function(d) {
      labels.attr("fill", "#B8B8B8")
      d3.select(this).attr("fill", "#D05353")
      nodes.attr("fill", function(node_d) {
        return d.id === node_d.id ? "#52489C" : "#B8B8B8"
      })
      links.attr("stroke", function(link_d) {
        return link_d.source === d.id || link_d.target === d.id ? "#E26D5C" : "#b8b8b8"
      })
      .attr("stroke-width", function(link_d) {
        return link_d.source === d.id || link_d.target === d.id ? 6 : 1
      })
    })
    .on("mouseout", function(d) {
      labels.attr("fill", "#000000")
        nodes.attr("fill", "#0D3B66")
        links.attr("stroke", "#69b3a2")
           .attr("stroke-width", 2)
    })
    
  
  var idToNode = {};
  data.nodes.forEach(function(n) {
    idToNode[n.id] = n;
  })

  var links = svg.selectAll("links")
    .data(data.links)
    .enter()
    .append("path")
    .attr("d", function(d) { 
        start = x(idToNode[d.source].name)
        end = x(idToNode[d.target].name)
        return ["M", start, height / 1.75,
              "A",
               (start - end) / 2, ",",
               (start - end) / 2, 0, 0, ",",
                start < end ? 1 : 0, end, ",", height / 1.75]
                .join(" ");
        })
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 2)
    .on("mouseover", function (d) {
        links.attr("stroke", "#B8B8B8")
        d3.select(this).attr("stroke", "#E26D5C")
                  .attr("stroke-width", 6)  
        nodes.attr("fill", function(node_d) {
          return node_d.id === d.source || node_d.id === d.target ? "#52489C" : "#B8B8B8"
        })
        labels.attr("fill", function(label_d) {
          return label_d.id === d.source || label_d.id === d.target ? "#D05353" : "#B8B8B8"
        })
      })
      .on("mouseout", function (d) {    
        links.attr("stroke", "#69b3a2")
           .attr("stroke-width", 2)
        nodes.attr("fill","#0D3B66")
        labels.attr("fill", "#000000")
      })  
  
  var nodes = svg.selectAll("nodes")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.name)})
    .attr("cy", height / 1.75)
    .attr("r", 8)
    .attr("fill", "#0D3B66")
    .on("mouseover", function (d) {
        nodes.attr("fill", "#B8B8B8")
        d3.select(this).attr("fill", "#52489C")
        links
          .attr("stroke", function (link_d) { return link_d.source === d.id || link_d.target === d.id ? "#E26D5C" : "#b8b8b8";})
          .attr("stroke-width", function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 6 : 2;})
        labels.attr("fill", function(label_d) {
          return label_d.id === d.id ? "#D05353" : "#B8B8B8"
        })
      })
      .on("mouseout", function (d) {
        nodes.attr("fill", "#0D3B66")
        links.attr("stroke", "#69b3a2")
           .attr("stroke-width", 2)
        labels.attr("fill", "#000000")        
      })
})
