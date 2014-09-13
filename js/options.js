swidth = $('body').innerWidth();
swidth -= 20;
document.getElementById("face").style += swidth - 600;
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

var importTxt = function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);

    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        var text;
        reader.onload = function(e) {
            text = reader.result;
            localStorage.save = text;
            location.reload();
        };

    } else {
        alert('Please upload a file before continuing')
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