//imports from localStorage
importData();

archGroupArray.sort(function(a,b){return Date.parse(b.date)-Date.parse(a.date)})

//shuffle at start of day?
//set page dimensions

var percentageArray = [];
var percentageLabels = [];

for (var i = 0; i<20; i++) {
    var n = archGroupArray.length-i;
    if (n>0){
        percentageArray.unshift(Math.floor(archGroupArray[i].calculateTotalPercentage()*1000)/10);
        percentageLabels.unshift(simplifyDate(archGroupArray[i].dateObject));
    }
}

var faceButton = document.getElementById("face");
faceButton.onmouseover = function() {
    faceButton.src = '../img/face/smile.png';
}
faceButton.onmouseout = function() {
    faceButton.src = '../img/face/up.png';
}
faceButton.onclick = smileyToggle;
var popBox = document.getElementById("popBox");
popBox.onclick = smileyKeepOn;
document.body.onclick = smileyOff;

var data = {
    labels: percentageLabels,
    datasets: [
        {
            //label: "My First dataset",
            fillColor: "rgba(220,0,220,0.2)",
            strokeColor: "rgba(220,0,220,1)",
            pointColor: "rgba(220,0,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: percentageArray
        }
    ]
};

var ctx = document.getElementById("chart1").getContext("2d");

var steps=10;
var max = 100;

var chart1 = new Chart(ctx).Line(data, {bezierCurve : false,
scaleOverride: true,
    scaleSteps: steps,
    scaleStepWidth: Math.ceil(max / steps),
    scaleStartValue: 0
});

//mapping events to grid button
var gridButton = document.getElementById("gridButton");
gridButton.onmouseover = function() {
    gridButton.src = '../img/grid2.png';
}
gridButton.onmouseout = function() {
    gridButton.src = '../img/grid.png';
}

gridButton.onclick=function(){document.location='options.html'};