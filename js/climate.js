var climateJSON = getClimateData();

var svg = d3.select(".c-data-container"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

d3.json(climateJSON, function(d) {
  d.date = parseTime(d.date);
  d.value = +d.value;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.value; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});


function getClimateData() {
    var noaaApiKey = 'NXVcXWNPcaatSuAMfSylQGWpCvCeTAsB';
    $.ajax({
       type : "GET",
       url : "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NORMAL_MLY&locationid=CITY:US360019&units=metric&startdate=2010-01-01&enddate=2010-12-01&datatypeid=mly-tavg-normal", // &datatypeid=TAVG,TMAX,TMIN
       headers : {'token': noaaApiKey},
       success : function(result) {
           var weatherData = result;
           console.log(weatherData.results);

           return weatherData.results;
       },
       error : function(result) {
           console.log("Could not access weather data.");
           console.log(result);
       }
     });
 }
