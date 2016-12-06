importData(localStorage.save);

archGroupArray.sort(function(a,b){return Date.parse(b.date)-Date.parse(a.date)});

var cards = 0;
var tossed_cards = 0;
var failThresh = -100;
var successThresh = 100;

for (var i in taskArray){
    var option = taskArray[i].unit;
    var id = taskArray[i].id;

    if (taskArray[i].toss == 1){
    	tossed_cards += 1;
    	$("#tossed").append("<div id = '" + id + "_card' class = 'halfCard'><b>" +
            taskArray[i].name + 
            unitTail(taskArray[i]) + "</b></br>");
    	var card = $("#"+id+"_card");
    	card.append("</br>");
    	card.append(makeMiniTable(id));
    	card.append("</br>");
        card.append("<div style = 'font-size:24px'>Untoss <img id = '" + id + "_toss' class = 'untoss' src = '../img/untoss.png'>")
        document.getElementById(id+"_toss").onmouseover = function(){this.src = '../img/untoss2.png'};
        document.getElementById(id+"_toss").onmouseout = function(){this.src = '../img/untoss.png'};
        document.getElementById(id+"_toss").onclick = function(id){return function(){unToss(id)}}(id);
        card.css({"borderColor" : "gold"});
    }

    else if(taskArray[i].karma>successThresh){
        cards += 1;
        $("#recommends").append("<div id = '" + id + "_card' class = 'card'>You're doing well with </br><b>" +
            taskArray[i].name + 
            unitTail(taskArray[i]) + "</b> Good job! </br>");
        var card = $("#"+id+"_card");
        if (taskArray[i].unit===0){
            card.append("Can you add a unit to it? (min, rep)</br>"
                );
            appendAndAttach(id,5,2,false,1)
            appendAndAttach(id,5,1,false,2)
        }
        else if (taskArray[i].unit == 1){
            card.append("Can you do it a few more times?</br>"+
                makeButton(id + "_1", "+1 rep")+ "&nbsp&nbsp" +
                makeButton(id + "_2", "+5 rep")+ "&nbsp&nbsp" +
                makeButton(id + "_3", "+10 rep")+ "</br>"
                );
            document.getElementById(id + "_1").onclick = pushAmountToUnit(id, 1, 1, true);
            document.getElementById(id + "_2").onclick = pushAmountToUnit(id, 5, 1, true);
            document.getElementById(id + "_3").onclick = pushAmountToUnit(id, 10, 1, true);
        }
        else if (taskArray[i].unit == 2){
            card.append("Can you do it for a few more minutes?</br>"+
                makeButton(id + "_1", "+1 min")+ "&nbsp&nbsp" +
                makeButton(id + "_2", "+5 min")+ "&nbsp&nbsp" +
                makeButton(id + "_3", "+10 min")+ "</br>"
                );
            document.getElementById(id + "_1").onclick = pushAmountToUnit(id, 1, 2, true);
            document.getElementById(id + "_2").onclick = pushAmountToUnit(id, 5, 2, true);
            document.getElementById(id + "_3").onclick = pushAmountToUnit(id, 10, 2, true);
        }
        card.append("</br>");
        card.append("<div style = 'font-size:48px'>Toss! <img id = '" + id + "_toss' class = 'toss' src = '../img/toss.png'>")
        document.getElementById(id+"_toss").onmouseover = function(){this.src = '../img/toss2.png'};
        document.getElementById(id+"_toss").onmouseout = function(){this.src = '../img/toss.png'};
        document.getElementById(id+"_toss").onclick = function(id){return function(){toss(id)}}(id);
        card.css({"borderColor" : "limegreen"});

    }

    else if(taskArray[i].karma<failThresh){
        cards += 1;
        $("#recommends").append("<div id = '" + id + "_card' class = 'card'>You can work harder on </br><b>" +
            taskArray[i].name + 
            unitTail(taskArray[i]) + "</b></br>");
        var card = $("#"+id+"_card");
        if (taskArray[i].unit===0){
            card.append("Can you add a unit to it? (min, rep)</br>"+
                makeButton(id + "_1", "5 min") + "&nbsp&nbsp" +
                makeButton(id + "_2", "5 rep")+ "</br>"
                );

            document.getElementById(id + "_1").onclick = pushAmountToUnit(id, 5, 2);
            document.getElementById(id + "_2").onclick = pushAmountToUnit(id, 5, 1);
        }
        else if (taskArray[i].unit == 1){
            card.append("Can you do it fewer times?</br>"+
                makeButton(id + "_1", "-1 rep")+ "&nbsp&nbsp" +
                makeButton(id + "_2", "-5 rep")+ "&nbsp&nbsp" +
                makeButton(id + "_3", "-10 rep")+ "</br>"
                );
            document.getElementById(id + "_1").onclick = pushAmountToUnit(id, -1, 1, true);
            document.getElementById(id + "_2").onclick = pushAmountToUnit(id, -5, 1, true);
            document.getElementById(id + "_3").onclick = pushAmountToUnit(id, -10, 1, true);
        }
        else if (taskArray[i].unit == 2){
            card.append("Can you do it for fewer minutes?</br>"+
                makeButton(id + "_1", "-1 min")+ "&nbsp&nbsp" +
                makeButton(id + "_2", "-5 min")+ "&nbsp&nbsp" +
                makeButton(id + "_3", "-10 min")+ "</br>"
                );
            document.getElementById(id + "_1").onclick = pushAmountToUnit(id, -1, 2, true);
            document.getElementById(id + "_2").onclick = pushAmountToUnit(id, -5, 2, true);
            document.getElementById(id + "_3").onclick = pushAmountToUnit(id, -10, 2, true);
            card.append("</br>");
        }
        if (taskArray[i].unit !== 0){
            card.append("Or perhaps leave out a unit altogether?</br>"+
                makeButton(id + "_leave", "Leave out unit")
                );
            document.getElementById(id + "_leave").onclick = pushAmountToUnit(id, 0, 0, true);
        }
        card.append("</br>");
        card.css({"borderColor" : "orangered"});
    }

}

var percentageArray = [];
var percentageLabels = [];

function makeButton(id, tag){
    return "<button id = " + id + ">" + tag + "</button>";
}

function pushAmountToUnit(id, quantity, unit,addTo){
    return function() {
        if (addTo){
            findTaskById(id).quantity += quantity;
        }
        else{
            findTaskById(id).quantity = quantity;
        }
        findTaskById(id).setUnit(unit);
        location.reload();
    };
}

function appendAndAttach(id, quantity, unit, addTo, tag){
    card.append(makeButton(id + "_"+tag, quantity + " " + unitNumToString(unit))+ "&nbsp&nbsp");
    document.getElementById(id + "_"+tag).onclick = pushAmountToUnit(id, quantity, unit, addTo);
}

function unitTail(task){
    if (task.unit == 1){
        return " - " + task.quantity + " reps";
    }
    else if (task.unit == 2){
        return " - " + task.quantity + " min";
    }
    else return "";
}

function toss(taskId){
	var task = findTaskById(taskId);
	task.toss = 1;
	saveToLS();
	location.reload();
}

function unToss(taskId){
	var task = findTaskById(taskId);
	task.toss = 0;
	saveToLS();
	location.reload();
}

function makeMiniTable(taskId){
	var task = findTaskById(taskId);
	var temp = "<div>";

	for (var i in task.activeDays){
		var tt = "<img class = 'mini' src = '../img/tile/redit.png'>"
		if (task.activeDays[i] == 1){
			tt = "<img class = 'mini' src = '../img/tile/gedit.png'>"
		}
		temp += tt;
	}
	temp += "</div>";
	return temp;
}


var popBox = document.getElementById("popBox");
var face = document.getElementById("face");
smileySetup(face, popBox);
document.onclick = function(){smileyOff(popBox)};

//mapping events to grid button
picSetup("chartsButton", '../img/charts.png', '../img/charts2.png', 'options.html');
picSetup("graphButton", '../img/graph.png', '../img/graph2.png', 'options1.html');
picSetup("advisorButton", '../img/advisor.png', '../img/advisor2.png', 'advisor.html');
picSetup("settingsButton", '../img/settings.png', '../img/settings2.png', 'settings.html');


if (cards === 0){
    $("#recommends").append("<div class = 'greyText'>No recommendations yet - keep using Habivator for a week or two.</div>")    
}
if (tossed_cards === 0){
    $("#tossed").append("<div class = 'greyText'>No tossed tasks yet - keep it up!</div>")    
}