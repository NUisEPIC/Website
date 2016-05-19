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
  team: "Team1",
  size: 25
}, {
  team: "Team2",
  size: 25
}, {
  team: "Team3",
  size: 25
}, {
  team: "Team4",
  size: 25
}];

AmCharts.ready(function () {
    // PIE CHART
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData;
    chart.titleField = "team";
    chart.valueField = "size";
    chart.labelText= "[[title]]";
    chart.balloonText= "";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.5;
    chart.outlineThickness = 1;

    chart.pullOutOnlyOne = true;
    chart.pullOutEffect = "elastic";
    // chart.clickSlice('1') = function() {
    //   console.log('1');
    // }
    chart.addListener('clickSlice', function(event) {
      console.log(event.dataItem.title);
      var team = event.dataItem.title;
      document.getElementById('teamdiv').innerText = team;
    });
    // console.log(chart.clickSlice(index))

    // WRITE
    chart.write("chartdiv");
});
