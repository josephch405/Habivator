importData(localStorage.save);

swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;

var justClicked = false;

archGroupArray.sort(function(a,b){return Date.parse(a.date)-Date.parse(b.date)})

//
for (var i in archGroupArray) {
    archGroupArray[i].addToPage();
}
for (var i in archGroupArray) {
    archGroupArray[i].attachEvents();
}

if (archGroupArray.length === 0){
	document.getElementById("archiveTables").style.height = 400;
	console.log(document.getElementById("archiveTables").style)
}

document.body.style.width=600*archGroupArray.length;
//set page dimensions

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

//mapping events to grid button
picSetup("chartsButton", '../img/charts.png', '../img/charts2.png', 'options.html');
picSetup("graphButton", '../img/graph.png', '../img/graph2.png', 'options1.html');
picSetup("advisorButton", '../img/advisor.png', '../img/advisor2.png', 'advisor.html');
picSetup("settingsButton", '../img/settings.png', '../img/settings2.png', 'settings.html');

window.scrollTo(600*archGroupArray.length,0);