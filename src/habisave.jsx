export const habisave = {
    pushPopup: (popupStoreState, callback) => {
        updateBadge(popupStoreState);
        chrome.storage.sync.set({ 'popupStoreState': popupStoreState }, callback);
    },
    pullPopup: (callback) => {
        chrome.storage.sync.get("popupStoreState", callback);
    },
    pushOptions: (optionsStoreState, callback) => {
        console.log("pushOptions run")
        chrome.storage.sync.set({ 'optionsStoreState': optionsStoreState }, callback);
    },
    pullOptions: (callback) => {
        console.log("pullOptions run")
        chrome.storage.sync.get("optionsStoreState", callback);
    },
    weekendTally: (oldState) => {
        chrome.storage.sync.get("optionsStoreState", function(b) {
            //first, construct new arch set
            var c = b.optionsStoreState ? b.optionsStoreState : {};
            if (Array.isArray(c.archTasks))
                c.archTasks.push(oldState);
            else
                c.archTasks = [oldState]
            chrome.storage.sync.set({ 'optionsStoreState': c }, () => {
                chrome.tabs.create({ url: "options.html" })
            });
        });
    },
    push: (n, o, callback) => {
        var obj = {};
        obj[n] = o;
        chrome.storage.sync.set(obj, callback);
        console.log("push called")
    },
    pull: (n, callback) => {
        chrome.storage.sync.get(n, callback);
        console.log("pull called")
    },


}

const dayOfWeek = () => (new Date().getDay() + 6) % 7;

const updateBadge = (popupStoreState) => {
    var c = 0;
    var tasks = popupStoreState.tasks;
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 255, 255, 0] })
    for (var i in tasks) {
        if (tasks[i].daysDone[dayOfWeek()] == 2) {
            c += 1;
        }
    }
    if (c == 0) {
        chrome.browserAction.setBadgeText({ text: "" });
    } else {
        chrome.browserAction.setBadgeText({ text: c + "" });
    }
}