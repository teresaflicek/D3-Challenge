var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var XAxis = "poverty";
var Yaxis = "healthcare";

// retrieve data from the csv file
d3.csv("assets/data/data.csv").then(function(dataCSV) {
    
    // parse data
    dataCSV.forEach(function(data) {
        data.healthcare = +data.healthcare
        data.poverty = +data.poverty
    });

    // create y scale function
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(dataCSV, d => d.healthcare)])
    .range([0, height]);

    // create x scale function
    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(dataCSV, d => d.poverty)])
    .range([0, width]);

    // create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
    .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(dataCSV)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

    // state abbreviations

    // <text dx="427.16279069767444" dy="242.570281124498" r="20" fill="lightblue" opacity="1">SampleText</text>


})