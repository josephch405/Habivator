importData(localStorage.save);


swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;

var justClicked = false;

archGroupArray.sort(function(a,b){return Date.parse(a.date)-Date.parse(b.date)})

for (var i in archGroupArray) {
    archGroupArray[i].addToPage();
}
for (var i in archGroupArray) {
    archGroupArray[i].attachEvents();
}
if (archGroupArray.length === 0){
	$("body").append("<div class = 'greyText'>No charts yet! Use Habivator for at least one week and come back.</div>")
	console.log("bob")
}

document.body.style.width=600*archGroupArray.length;
//set page dimensions

var popBox = document.getElementById("popBox");
var face = document.getElementById("face");
smileySetup(face, popBox);
document.onclick = function(){smileyOff(popBox)};

//popBox.onclick = smileyKeepOn;

//mapping events to grid button
picSetup("chartsButton", '../img/charts.png', '../img/charts2.png', 'options.html');
picSetup("graphButton", '../img/graph.png', '../img/graph2.png', 'options1.html');
picSetup("advisorButton", '../img/advisor.png', '../img/advisor2.png', 'advisor.html');
picSetup("settingsButton", '../img/settings.png', '../img/settings2.png', 'settings.html');

window.scrollTo(600*archGroupArray.length,0);