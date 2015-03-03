var timeoutLength = 60*60*1000;
var notifier;

function checkInterv(){
    if (!isNaN(parseInt(localStorage.notifInterval))) {
        timeoutLength = parseInt(localStorage.notifInterval);
    }
    if (localStorage.notifActive == "false"){
        notifier = setTimeout(function(){checkInterv()}, 30*60*1000);
    }
    else{
        notifier = setTimeout(function() {
            notify("Doing alright?", notifierAgent())
        }, timeoutLength);
    }
}

checkInterv();

function notify(title, message){
    console.log("fired")
    chrome.notifications.clear("id", function() {});
    var opt = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "../icon.png"
    }
    if (localStorage.notifActive != "false"){
        chrome.notifications.create("id", opt, function() {})
    }
    checkInterv();
}

function notifierAgent(){
    return "Fulfill a habit!";
}


importData(localStorage.save);