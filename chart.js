const DATA_FILE = "data.tsv";

// function updateLanguage(language) {

//     currentLang = language;

//     var data = letterData
//         .filter(function(d) {
//             console.log("Letter: ", d.Letter, " Freq: ", d[language]);
//             if (+d[language] > 0) {
//                 console.log("Keeping.");
//             } else {
//                 console.log("Removing.");
//             }
//             return +d[language] > 0;
//         })
//         .map(function(d) {
//             console.log("d.Letter: ", d.Letter, "d[", language, "]: ", d[language]);
//             return {Letter: d.Letter, frequency: d[language]};
//         })
//         .sort(function(a, b) {
//             return b.frequency - a.frequency;
//         });

//     // the TSV parser apparently reads in the column names, so we can use d.frequency
//     yScale.domain([0, d3.max(data, function(d) { return d.frequency; })]);
//     console.log("yScale.domain: ", yScale.domain());

//     xScale.domain(data.map(function(d) {
//         return d.Letter;
//     })); //gets an array of all the letters in the data

//     chart.select(".x").remove();
//     chart.select(".y").remove();


//     // Add in axes
//     chart.append("g")
//         .attr("class", "x axis")
//         // .axis "rubber stamp" will be called in resize()
//       .append("text")
//         .style("text-anchor", "middle")
//         .style("font-size", "1.2em")
//         .text(String(data.length) + " Letters");

//     chart.append("g")
//         .attr("class", "y axis")
//         // axis "rubber stamp" will be called in resize()
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", "-70")
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .style("font-size", "1.2em")
//         .text("Frequency");

//     //var barWidth = chartWidth / data.length; //bar width is now variable

//     // make new selection for the update cycle
//     var bar = chart.selectAll(".bar")
//         .data(data);

//     console.log("Update: ", data);

//     // get rid of old elements with exit selection
//     bar.exit().remove();

//     console.log("Exit: ", bar.exit());

//     // add new elements with enter selection
//     bar.enter().append("rect")
//         .attr("class", "bar")
//       .append("title");

//     console.log("Enter: ", bar.enter());

//     // do stuff with update selection
//     bar
//         // bar positions and heights will be set in resize()
//       .select("title").text(function(d) { return d.Letter + ": " + d.frequency + "%"; });

//     resize();


// }

// // default language
// var currentLang = INITIAL_LANG

// var margin = {top: 20, right: 30, bottom: 50, left: 70};
// var chartWidth = 960 - margin.left - margin.right; // gives inner width (after margins)
// var chartHeight = 500 - margin.top - margin.bottom; // gives inner height (after margins)


// var yScale = d3.scale.linear()
//     .range([chartHeight, 0]); // SVG's y axis has 0 at top
//     // can't set domain yet; depends on data

// var xScale = d3.scale.ordinal()
//     .rangeRoundBands([0, chartWidth], .1); //divides chartWidth into evenly sized bands with padding of .1


// var xAxis = d3.svg.axis() // "rubber stamp" function that produces x-axis
//   .scale(xScale)
//   .orient("bottom");

// var yAxis = d3.svg.axis() // "rubber stamp" function that produces y-axis
//   .scale(yScale)
//   .orient("left")
//   .tickFormat(function(d) { return d + "%"; });


// var chart = d3.select("#chart")
//     .attr("width", chartWidth + margin.left + margin.right) //make the chart element the outer width (chart data + margins)
//     .attr("height", chartHeight + margin.top + margin.bottom) // make the chart element the outer height (chart data + margins)
//   .append("g") //add a g element to offset the chart data area by the margin size
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// var letterData; //can we declare it like this, without initial value?

// // RESPONSIVITY
// function resize() {
//     /* Update graph using new width and height (code below) */
//     // Re-draws axes and bars

//     /* Find the new window dimensions */
//     var svgWidth = parseInt(d3.select("#chart").style("width")),
//     svgHeight = parseInt(d3.select("#chart").style("height"));
//     var width = svgWidth - margin.left - margin.right,
//     height = svgHeight - margin.top - margin.bottom;

//     console.log("new width: ", width, " new height: ", height);

//     /* Update the range of the scale with new width/height */
//     xScale.rangeRoundBands([0, width], .1);
//     yScale.range([height, 0]).nice();

//     yAxis.ticks(Math.max(height/50, 2)); //places a tick mark every 50 pixels, minimum of 2 ticks

//     /* Update the axis with the new scale */
//     chart.select('.x.axis')
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//       .select('text')
//         .attr("x", (width- margin.left)/2)
//         .attr("y", margin.bottom);

//     chart.select('.y.axis')
//       .call(yAxis);

//     /* Force D3 to recalculate and update bars */
//     chart.selectAll('.bar')
//         .attr("x", function(d) { return xScale(d.Letter); })
//         .attr("y", function(d) { return yScale(d.frequency); })
//         .attr("width", xScale.rangeBand())
//         .attr("height", function(d) { return height - yScale(d.frequency); })
// }

// // Resize graph when window is resized
// d3.select(window).on('resize', resize);


// // LOAD DATA
// d3.tsv(DATA_FILE, type, function(error, data){
//     if (error) {
//         console.log("ERROR: ", error);
//     }

//     //Code here executes after data has loaded
//     letterData = data;
//     console.log("letterData: ", letterData);

//     // Set up selection options for each language in the dataset
//     var selector = d3.select("#testSelect optgroup");
//     //console.log(Object.keys(data[0]));
//     Object.keys(data[0]).forEach( function(lang) {
//       if (lang === "Letter") return;
//       selector.append("option")
//         .attr("value", lang)
//         .text(lang);
//     });


//     // update graph with initial language
//     updateLanguage(currentLang);

// });

// // Code here executes while data is loading
// function type(d) {
//     console.log("type(", d, ")");
//   Object.keys(d).forEach(function(lang) {
//       console.log("d[", lang, "]: ", d[lang]);
//     if (lang === "Letter") return;
//     d[lang] = +d[lang]; // coerces string (from tsv) to number
//   });
//   return d;
// }

const margin = {
  top: 40, 
  right: 20, 
  bottom: 30, 
  left: 40
};

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.tsv(DATA_FILE, type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

