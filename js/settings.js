importData(localStorage.save);

archGroupArray.sort(function(a,b){return Date.parse(b.date)-Date.parse(a.date)})

var percentageArray = [];
var percentageLabels = [];

var faceButton = document.getElementById("face");
picSetup("face", iconDB.smile, iconDB.smile_up)
faceButton.onclick = smileyToggle;

var popBox = document.getElementById("popBox");
popBox.onclick = smileyKeepOn;
document.body.onclick = smileyOff;

var fileInput = $('#files');
//var uploadButton = $('#upload')[0];

document.getElementById("files").onchange = function(){importTxt();}
//uploadButton.addEventListener("click", importTxt);

var exportButton = $('#export')[0];
exportButton.addEventListener("click", exportTxt);

//mapping events to grid button
picSetup("chartsButton", '../img/charts.png', '../img/charts2.png', 'options.html');
picSetup("graphButton", '../img/graph.png', '../img/graph2.png', 'options1.html');
picSetup("advisorButton", '../img/advisor.png', '../img/advisor2.png', 'advisor.html');
picSetup("settingsButton", '../img/settings.png', '../img/settings2.png', 'settings.html');

document.getElementById("notifDiv").innerHTML = stringifyNotifInterval();

function setNotifOnclick(id, duration){
    document.getElementById(id).onclick = function(){
        localStorage.notifActive = true;
        localStorage.notifInterval = duration;
        document.getElementById("notifDiv").innerHTML = stringifyNotifInterval();
    }
}

setNotifOnclick("notif_30min",30 * 60 * 1000);
setNotifOnclick("notif_1",60 * 60 * 1000);
setNotifOnclick("notif_2",120 * 60 * 1000);
setNotifOnclick("notif_4",240 * 60 * 1000);

document.getElementById("clear_records").onclick = function(){clearRecords()};
document.getElementById("clear_all").onclick = function(){clearAll()};

document.getElementById("notif_never").onclick = function(){
    localStorage.notifActive = false;
    document.getElementById("notifDiv").innerHTML = stringifyNotifInterval();
}

function stringifyNotifInterval(){
    if (localStorage.notifActive == "false"){
        return "<br>Notifications inactive."
    }
    var text = "<br>Currently every ";
    if (parseInt(localStorage.notifInterval) / (60*60*1000)>=1){
        text += parseInt(localStorage.notifInterval) / (60*60*1000) + " hr ";
    }
    if (parseInt(localStorage.notifInterval) % (60*60*1000)>0){
        text += parseInt(localStorage.notifInterval) % (60*60*1000) / (60*1000) + " min";
    }
    return text;
}