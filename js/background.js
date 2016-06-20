var timeoutLength = 60*60*1000;
var notifier;
getFromSync();

if (typeof localStorage.firstTime != "string"){
    localStorage.firstTime = true;
    chrome.tabs.create({url: "html/tut.html"});
}

updateBadge();
checkIfDatePassed();

function checkInterv(){

    backgroundSync();
    
    if (!isNaN(parseInt(chrome.storage.sync.notifInterval))) {
        timeoutLength = parseInt(chrome.storage.sync.notifInterval);
    }
    if (chrome.storage.sync.notifActive == "false"){
        notifier = setTimeout(function(){checkInterv()}, 10*60*1000);
    }
    else{
        notify();
        notifier = setTimeout(function(){checkInterv()}, timeoutLength);
    }
}

checkInterv();

function notify(messageFx){
	var title = "Doing alright?"
    console.log("fired")
    message = notifierAgent();
    chrome.notifications.clear("id", function() {});
    var opt = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "../icon.png"
    }
    if (chrome.storage.sync.notifActive != "false"){
        chrome.notifications.create("id", opt, function() {})
    }
}

function notifierAgent(){
    var temp = [];
    for (var i = 0 ; i < taskArray.length; i++){
        if (taskArray[i].daysDone[dayOfWeek-1] == 2 && taskArray[i].toss == 0){
            temp.push(taskArray[i].name);
        }
    }
    if (temp.length>0){
        return "Try this habit: " + temp[Math.floor(Math.random()*temp.length)];
    }
    return "Stay positive!";
}

function backgroundSync(){
    taskArray = [];
    archGroupArray = [];
    getFromSync();
    updateDate();
    checkIfDatePassed();
    saveToLS();
    updateBadge();
}