var chart;
var legend;

// var chartData = [{
//     country: "Czech Republic",
//     litres: 301.90
// }, {
//     country: "Ireland",
//     litres: 201.10
// }, {
//     country: "Germany",
//     litres: 165.80
// }, {
//     country: "Australia",
//     litres: 139.90
// }, {
//     country: "Austria",
//     litres: 128.30
// }, {
//     country: "UK",
//     litres: 99.00
// }, {
//     country: "Belgium",
//     litres: 60.00
// }];

var chartData = [{
  team: "WildHacks",
  size: 14.28,
  blurb: "Wildhacks plans and executes a hackathon... Check out their website at:",
  color: "#d28747"
}, {
  team: "Sprout",
  size: 14.28,
  blurb: "Sprout is a preorientation program...",
  color: "#f5ab0c"
}, {
  team: "Tech",
  size: 14.28,
  blurb: "Tech codes things (like this website!)... Check out our github at:",
  color: "#e7431e"
}, {
  team: "NUVC",
  size: 14.28,
  blurb: "NUVC plans and executes a startup pitch competition... Check out their website at:",
  color: "#a10f08"
},
{
  team: "Launch",
  size: 14.28,
  blurb: "Launch teaches students...",
  color: "#eeb96b"
},
{
  team: "Branding",
  size: 14.28,
  blurb: "Branding brands EPIC and provides content...",
  color: "#f5debe"
},
{
  team: "Exec",
  size: 14.28,
  blurb: "Exec makes EPIC run... new initiatives... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a mi lacinia, sollicitudin nulla nec, pellentesque ante. Proin in iaculis ipsum. Etiam tempor justo quis magna consectetur, aliquam rhoncus sapien viverra. Suspendisse lectus odio, vulputate vel iaculis laoreet, cursus eget sem. Fusce non tincidunt metus, ac tempus urna. Ut tincidunt metus in sem dignissim, ut tempus nibh efficitur. Quisque sed ultricies nunc. Mauris vitae orci eget tellus porta scelerisque rutrum eu massa. Pellentesque sit amet libero lobortis, convallis tortor sed, tempus nibh. Cras justo ex, laoreet ut cursus sed, finibus et ex. Nulla convallis orci elit, sed porttitor turpis tempus vel. Maecenas sed mauris imperdiet, varius odio sit amet, venenatis ipsum. Vestibulum ultricies ipsum erat, ut tempus massa pretium eget.",
  color: "#e83140"
},]

AmCharts.ready(function () {
    // PIE CHART
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData;
    chart.titleField = "team";
    chart.valueField = "size";
    chart.descriptionField="blurb";
    chart.fontFamily = "inherit";
    chart.fontSize = "16";
    chart.outlineColor = "#FFFFFF";
    chart.colorField = "color"
    chart.outlineAlpha = 0.5;
    chart.outlineThickness = 1;
    chart.labelText= "[[title]]";
    chart.balloonText= "";
    chart.pullOutOnlyOne = true;
    chart.pullOutEffect = "elastic";
    // chart.clickSlice('1') = function() {
    //   console.log('1');
    // }
    chart.addListener('clickSlice', function(event) {
      //console.log(event.dataItem.description);
      var about = event.dataItem.description;
      document.getElementById('teamdiv').innerText = about;
    });
    // console.log(chart.clickSlice(index))

    // WRITE
    chart.write("chartdiv");
});
