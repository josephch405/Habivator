export const habisave = {
	pushPopup: (popupStoreState, callback)=>{
    	chrome.storage.sync.set({'popupStoreState': popupStoreState}, callback);
	},
	pullPopup: (callback) =>{
        chrome.storage.sync.get("popupStoreState", callback);
	},
	pushOptions: (optionsStoreState, callback)=>{
		console.log("pushOptions run")
    	chrome.storage.sync.set({'optionsStoreState': optionsStoreState}, callback);
	},
	pullOptions: (callback) => {
		console.log("pullOptions run")
        chrome.storage.sync.get("optionsStoreState", callback);
	},
	weekendTally: function(){
		chrome.storage.sync.get("popupStoreState", function(a){
			chrome.storage.sync.get("optionsStoreState", function(b){
				//first, construct new arch set
				var c = b.optionsStoreState ? b.optionsStoreState : {};
				console.log("test")
				console.log(b)
				console.log(c)
				if(Array.isArray(c))
					c.archTasks.push(a.popupStoreState);
				else
					c.archTasks = [a.popupStoreState]
				chrome.storage.sync.set({'optionsStoreState': c}, () => {
						chrome.storage.sync.set({'popupStoreState': {}}, () => {
							chrome.tabs.create({url: "html/options.html"})
						})
					}
				);
			});
		});
	}
}