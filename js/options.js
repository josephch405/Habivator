swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;
//imports from localStorage

importData();


//
for (var i in archGroupArray) {
    archGroupArray[i].addToTable();
}
for (var i in archGroupArray) {
    archGroupArray[i].attachEvents();
}
//shuffle at start of day?

var smileyToggle = function() {
    if (document.getElementById("popBox").style.visibility == "visible") {
        document.getElementById("popBox").style.visibility = "hidden";
    } else {
        document.getElementById("popBox").style.visibility = "visible";
    }
}

document.getElementById("face").onmouseover = function() {
    document.getElementById("face").src = '../img/face/smile.png';
}
document.getElementById("face").onmouseout = function() {
    document.getElementById("face").src = '../img/face/up.png';
}
document.getElementById("face").onclick = smileyToggle;
var fileInput = $('#files');
var uploadButton = $('#upload')[0];
uploadButton.addEventListener("click", importTxt);
var exportButton = $('#export')[0];
exportButton.addEventListener("click", exportTxt);

