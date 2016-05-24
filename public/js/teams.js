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
  blurb: "Wildhacks plans and executes a hackathon... Check out their website at:"
}, {
  team: "Sprout",
  size: 14.28,
  blurb: "Sprout is a preorientation program..."
}, {
  team: "Tech",
  size: 14.28,
  blurb: "Tech codes things (like this website!)... Check out our github at:"
}, {
  team: "NUVC",
  size: 14.28,
  blurb: "NUVC plans and executes a startup pitch competition... Check out their website at:"
},
{
  team: "Launch",
  size: 14.28,
  blurb: "Launch teaches students..."
},
{
  team: "Branding",
  size: 14.28,
  blurb: "Branding brands EPIC and provides content..."
},
{
  team: "Exec",
  size: 14.28,
  blurb: "Exec makes EPIC run... new initiatives..."
},]

AmCharts.ready(function () {
    // PIE CHART
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData;
    chart.titleField = "team";
    chart.valueField = "size";
    chart.descriptionField="blurb";
    chart.outlineColor = "#FFFFFF";
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
