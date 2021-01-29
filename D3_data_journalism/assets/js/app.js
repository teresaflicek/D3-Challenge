// select SVG element
var svgWidth = 1000;
var svgHeight = 650;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial params
var XAxis = "poverty";
var Yaxis = "healthcare";

// retrieve data from the csv file
d3.csv("assets/data/data.csv").then(function (dataCSV) {

  // parse data
  dataCSV.forEach(function (data) {
    data.healthcare = +data.healthcare
    data.poverty = +data.poverty
  });

  // create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([2.5, d3.max(dataCSV, d => d.healthcare)])
    .range([height, 0]);

  // create x scale function
  var xLinearScale = d3.scaleLinear()
    .domain([8.75, d3.max(dataCSV, d => d.poverty)])
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
    .attr("r", 15)
    .classed("stateCircle", true)
    .attr("opacity", ".8");

  // append x axis label
  chartGroup.append("text")
    .attr("x", 400)
    .attr("y", 610)
    .classed("aText", true)
    .text("In Poverty %");

  // append y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacks Healthcare %");

  // state abbreviations
  var circlesLabels = chartGroup.selectAll(null)
    .data(dataCSV)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.healthcare))
    .classed("stateText", true)
    .attr("alignment-baseline", "central")

});