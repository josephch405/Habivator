
swidth = $('body').innerWidth();
swidth-=20;
console.log(swidth);
document.getElementById("face").style+=swidth-600;
//imports from localStorage


importData();
checkIfDatePassed();

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