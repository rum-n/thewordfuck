const DATA_FILE = "test.tsv";

// COLUMN CHART
let margin = {
  top: 85, 
  right: 50, 
  bottom: 200, 
  left: 40
};

let width = 1100;
let height = 600;
let padding = 100;

let x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

let y = d3.scale.linear()
    .range([height, 0]);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Title:</strong> <span style='color:red'>" + d.Name + "</span> <br> <strong>Number of Fucks:</strong> <span style='color:red'>" + d.NumberOfFucks + "</span> <br> <strong>Fucks per Minute:</strong> <span style='color:red'>" + d.FucksPerMinute + "</span> <br> <strong>Year:</strong> <span style='color:red'>" + d.Year + "</span>";
  })

let svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.tsv(DATA_FILE, type, function(error, data) {
  x.domain(data.map(function(d) { return d.Name; }));
  y.domain([0, d3.max(data, function(d) { return d.NumberOfFucks; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 5)
      .attr("dy", ".035em")
      .attr("transform", "rotate(70)")
      .style("text-anchor", "start");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Fucks");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.NumberOfFucks); })
      .attr("height", function(d) { return height - y(d.NumberOfFucks); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.NumberOfFucks = +d.NumberOfFucks;
  return d;
}

// SCATTER PLOT



