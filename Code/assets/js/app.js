// set the dimensions and margins of the graph
var margin = {
    top: 20, 
    right: 40, 
    bottom: 70, 
    left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



// data
d3.csv("assets/data/data.csv").then(function(data) {
    // format used data as numbers
    data.forEach(d => {
        d.smokes = +d.smokes;
        d.age = +d.age;
    });

    // X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.smokes)))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // X label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Smokers (%)");

    // Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.age))
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", (height / 2) * -1)
        .attr("dy", -40)
        .text("Age");

    // dots
    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter()
        .append('g');

    // dots to gdots
    gdots.append("circle")
        .attr("cx", d => x(d.smokes))
        .attr("cy", d => y(d.age))
        .attr("r", 9)
        .style("fill", "#B5BD89");
    
    // country names to gdots
    gdots.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.smokes))
        .attr("y", d => y(d.age))
        .attr("dx", -5)
        .attr("dy", 2)
        .style("font-size", "7px");
});
