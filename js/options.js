swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;
//imports from localStorage

importData();

var justClicked = false;

archGroupArray.sort(function(a,b){return Date.parse(b.date)-Date.parse(a.date)})

//
for (var i in archGroupArray) {
    archGroupArray[i].addToTable();
}
for (var i in archGroupArray) {
    archGroupArray[i].attachEvents();
}
//shuffle at start of day?

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

var fileInput = $('#files');
var uploadButton = $('#upload')[0];
uploadButton.addEventListener("click", importTxt);
var exportButton = $('#export')[0];
exportButton.addEventListener("click", exportTxt);

