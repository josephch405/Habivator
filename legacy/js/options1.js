importData(localStorage.save);

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

var popBox = document.getElementById("popBox");
var face = document.getElementById("face");
smileySetup(face, popBox);
document.onclick = function(){smileyOff(popBox)};


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
picSetup("chartsButton", '../img/charts.png', '../img/charts2.png', 'options.html');
picSetup("graphButton", '../img/graph.png', '../img/graph2.png', 'options1.html');
picSetup("advisorButton", '../img/advisor.png', '../img/advisor2.png', 'advisor.html');
picSetup("settingsButton", '../img/settings.png', '../img/settings2.png', 'settings.html');

if (archGroupArray.length === 0){
    $("body").append("<div class = 'greyText'>No records yet! Use Habivator for at least one week and come back.</div>")
    console.log("bob")
}