(function($, Snap) {
    $(function() {
        var snap = Snap(500, 500);

//var chartData = [{
  //team: "WildHacks",
  //size: 14.28,
  //blurb: "Wildhacks plans and executes a hackathon... Check out their website at:",
  //color: "#33c0cd"
//}, {
  //team: "Sprout",
  //size: 14.28,
  //blurb: "Sprout is a preorientation program...",
  //color: "#c15c65"
//}, {
  //team: "Tech",
  //size: 14.28,
  //blurb: "Tech codes things (like this website!)... Check out our github at:",
  //color: "#fac440"
//}, {
  //team: "NUVC",
  //size: 14.28,
  //blurb: "NUVC plans and executes a startup pitch competition... Check out their website at:",
  //color: "#a4e8de"
//},
//{
  //team: "Launch",
  //size: 14.28,
  //blurb: "Launch teaches students...",
  //color: "#b31b28"
//},
//{
  //team: "Branding",
  //size: 14.28,
  //blurb: "Branding brands EPIC and provides content...",
  //color: "#fbe5af"
//}]
        var data = [
            {
                name: 'Wildhacks',
                attr: {
                    id: '#wildhacks-slice',
                    stroke: '#f1f1f1',
                    fill: '#f1f1f1',
                    fillOpacity: 0.5,
                    strokeWidth: 1
                }
            },
            {
                name: 'Tech',
                attr: {
                    id: '#tech-slice',
                    stroke: '#123123',
                    fill: '#123123',
                    fillOpacity: 0.5,
                    strokeWidth: 1
                }
            },
            {
                name: 'NUVC',
                attr: {
                    id: '#nuvc-slice',
                    stroke: '#3da08d',
                    fill: '#3da08d',
                    fillOpacity: 0.5,
                    strokeWidth: 1
                }
            }
        ];
        var sector = drawTeamChart(snap, {x:100, y:100}, 50, 95, data);
    });
    
    function drawTeamChart(snap, center, rIn, rOut, data) {
        var delta = 360/data.length;
        for (var i = 0; i < data.length; i++) {
            drawPieSlice(snap, center, rIn, rOut, i * delta, delta, data[i].attr);
        }
    }

    function drawPieSlice(snap, center, rIn, rOut, startDeg, delta, attr) {
        var startOut = {
            x: center.x + rOut * Math.cos(Math.PI*(startDeg)/180),
            y: center.y + rOut * Math.sin(Math.PI*(startDeg)/180)
        };
        var endOut = {
            x: center.x + rOut * Math.cos(Math.PI*(startDeg + delta)/180),
            y: center.y + rOut * Math.sin(Math.PI*(startDeg + delta)/180)
        };
        var startIn = {
            x: center.x + rIn * Math.cos(Math.PI*(startDeg + delta)/180),
            y: center.y + rIn * Math.sin(Math.PI*(startDeg + delta)/180)
        };
        var endIn = {
            x: center.x + rIn * Math.cos(Math.PI*(startDeg)/180),
            y: center.y + rIn * Math.sin(Math.PI*(startDeg)/180)
        };
        var largeArc = delta > 180 ? 1 : 0;
        var path = "M" + startOut.x + " " + startOut.y +
            "A" + rOut + " " + rOut + " 0 " +
            largeArc + " 1 " + endOut.x + " " + endOut.y +
            "L" + startIn.x + " " + startIn.y +
            "A" + rIn + " " + rIn + " 0 " +
            largeArc + " 0 " + endIn.x + " " + endIn.y +
            "L" + startOut.x + " " + startOut.y + "Z";
        
        var path = snap.path(path);
        path.attr(attr);
        
        return path;
    }
})(jQuery, Snap);
