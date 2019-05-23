/* Force Directed Graph */
var w = 300, h = 300;

var svg = d3.select("svg")
            .attr("width", w)
            .attr("height", h);

var nodes_data = [
    {
      "No.": 3,
      "Nationality": "Brazil",
      "Position": "MF",
      "id": "Fabinho"
    },
    {
      "No.": 4,
      "Nationality": "Netherlands",
      "Position": "DF",
      "id": "Virgil van Dijk"
    },
    {
      "No.": 5,
      "Nationality": "Netherlands",
      "Position": "MF",
      "id": "Georginio Wijnaldum"
    },
    {
      "No.": 6,
      "Nationality": "Croatia",
      "Position": "DF",
      "id": "Dejan Lovren"
    },
    {
      "No.": 7,
      "Nationality": "England",
      "Position": "MF",
      "id": "James Milner"
    },
    {
      "No.": 8,
      "Nationality": "Guinea",
      "Position": "MF",
      "id": "Naby Keïta"
    },
    {
      "No.": 9,
      "Nationality": "Brazil",
      "Position": "FW",
      "id": "Roberto Firmino"
    },
    {
      "No.": 10,
      "Nationality": "Senegal",
      "Position": "FW",
      "id": "Sadio Mané"
    },
    {
      "No.": 11,
      "Nationality": "Egypt",
      "Position": "FW",
      "id": "Mohamed Salah"
    },
    {
      "No.": 12,
      "Nationality": "England",
      "Position": "DF",
      "id": "Joe Gomez"
    },
    {
      "No.": 13,
      "Nationality": "Brazil",
      "Position": "GK",
      "id": "Alisson"
    },
    {
      "No.": 14,
      "Nationality": "England",
      "Position": "MF",
      "id": "Jordan Henderson"
    },
    {
      "No.": 15,
      "Nationality": "England",
      "Position": "FW",
      "id": "Daniel Sturridge"
    },
    {
      "No.": 18,
      "Nationality": "Spain",
      "Position": "DF",
      "id": "Alberto Moreno"
    },
    {
      "No.": 20,
      "Nationality": "England",
      "Position": "MF",
      "id": "Adam Lallana"
    },
    {
      "No.": 21,
      "Nationality": "England",
      "Position": "MF",
      "id": "Alex Oxlade-Chamberlain"
    },
    {
      "No.": 22,
      "Nationality": "Belgium",
      "Position": "GK",
      "id": "Simon Mignolet"
    },
    {
      "No.": 23,
      "Nationality": "Switzerland",
      "Position": "MF",
      "id": "Xherdan Shaqiri"
    },
    {
      "No.": 24,
      "Nationality": "England",
      "Position": "FW",
      "id": "Rhian Brewster"
    },
    {
      "No.": 26,
      "Nationality": "Scotland",
      "Position": "DF",
      "id": "Andrew Robertson"
    },
    {
      "No.": 27,
      "Nationality": "Belgium",
      "Position": "FW",
      "id": "Divock Origi"
    },
    {
      "No.": 32,
      "Nationality": "Cameroon",
      "Position": "DF",
      "id": "Joël Matip"
    },
    {
      "No.": 47,
      "Nationality": "England",
      "Position": "DF",
      "id": "Nathaniel Phillips"
    },
    {
      "No.": 48,
      "Nationality": "England",
      "Position": "MF",
      "id": "Curtis Jones"
    },
    {
      "No.": 58,
      "Nationality": "Wales",
      "Position": "FW",
      "id": "Ben Woodburn"
    },
    {
      "No.": 62,
      "Nationality": "Republic of Ireland",
      "Position": "GK",
      "id": "Caoimhin Kelleher"
    },
    {
      "No.": 64,
      "Nationality": "Portugal",
      "Position": "MF",
      "id": "Rafael Camacho"
    },
    {
      "No.": 66,
      "Nationality": "England",
      "Position": "DF",
      "id": "Trent Alexander-Arnold"
    }
  ];

var links_data = [
    {
      "source": "Fabinho",
      "target": "Jordan Henderson"
    },
    {
      "source": "Georginio Wijnaldum",
      "target": "Jordan Henderson"
    },
    {
      "source": "James Milner",
      "target": "Jordan Henderson"
    },
    {
      "source": "Naby Keïta",
      "target": "Jordan Henderson"
    },
    {
      "source": "Jordan Henderson",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Adam Lallana",
      "target": "Jordan Henderson"
    },
    {
      "source": "Alex Oxlade-Chamberlain",
      "target": "Jordan Henderson"
    },
    {
      "source": "Xherdan Shaqiri",
      "target": "Jordan Henderson"
    },
    {
      "source": "Curtis Jones",
      "target": "Jordan Henderson"
    },
    {
      "source": "Rafael Camacho",
      "target": "Jordan Henderson"
    },
    {
      "source": "Alisson",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Caoimhin Kelleher",
      "target": "Alisson"
    },
    {
      "source": "Simon Mignolet",
      "target": "Alisson"
    },
    {
      "source": "Sadio Mané",
      "target": "Mohamed Salah"
    },
    {
      "source": "Mohamed Salah",
      "target": "Jordan Henderson"
    },
    {
      "source": "Daniel Sturridge",
      "target": "Mohamed Salah"
    },
    {
      "source": "Rhian Brewster",
      "target": "Mohamed Salah"
    },
    {
      "source": "Divock Origi",
      "target": "Mohamed Salah"
    },
    {
      "source": "Ben Woodburn",
      "target": "Mohamed Salah"
    },
    {
      "source": "Roberto Firmino",
      "target": "Mohamed Salah"
    },
    {
      "source": "Dejan Lovren",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Joe Gomez",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Alberto Moreno",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Andrew Robertson",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Joël Matip",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Nathaniel Phillips",
      "target": "Virgil van Dijk"
    },
    {
      "source": "Trent Alexander-Arnold",
      "target": "Virgil van Dijk"
    }
  ];

var simulation = d3.forceSimulation()
                  .nodes(nodes_data);
    simulation
      .force("charge_force", d3.forceManyBody())
      .force("center_force", d3.forceCenter(w / 2, h / 2));

var node = svg.append("g")
              .attr("class", "nodes")
              .selectAll("circle")
              .data(nodes_data)
              .enter()
              .append("circle")
              .attr("r", 5)
              .attr("fill", "#991C20");            

var link_force = d3.forceLink(links_data)
                   .id(function(d) {return d.id})

simulation.force("links", link_force)

var link = svg.append("g")
              .attr("class", "links")
              .selectAll("line")
              .data(links_data)
              .enter()
              .append("line")
              .attr("stroke-width", 1.5)
              .attr("stroke","#991C20");

function tickActions() {
  node
    .attr("cx", function(d) { return d.x; } )
    .attr("cy", function(d) { return d.y; } )
  link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });  
}

simulation.on("tick", tickActions)