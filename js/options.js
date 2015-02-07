importData(localStorage.save);

swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;

var justClicked = false;

archGroupArray.sort(function(a,b){return Date.parse(a.date)-Date.parse(b.date)})

//
for (var i in archGroupArray) {
    archGroupArray[i].addToTable();
}
for (var i in archGroupArray) {
    archGroupArray[i].attachEvents();
}

if (archGroupArray.length == 0){
	console.log("asdfasfd")
	document.getElementById("archiveTables").style.height = 400;
	console.log(document.getElementById("archiveTables").style)
}

document.body.style.width=600*archGroupArray.length;
window.scrollTo(600*archGroupArray.length,0);
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

var fileInput = $('#files');
var uploadButton = $('#upload')[0];
uploadButton.addEventListener("click", importTxt);
var exportButton = $('#export')[0];
exportButton.addEventListener("click", exportTxt);

var chartButton = document.getElementById("chartsButton");
chartButton.onmouseover = function() {
    chartButton.src = '../img/charts2.png';
}
chartButton.onmouseout = function() {
    chartButton.src = '../img/charts.png';
}

chartButton.onclick=function(){document.location='options1.html'};