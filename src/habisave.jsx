export const habisave = {
	pushPopup: (popupStoreState)=>{
    	chrome.storage.sync.set({'popupStoreState': popupStoreState}, function() {
        	console.log('tasks saved');
    	});
	},
	pullPopup: (callback) =>{
		console.log("pullRun")
        chrome.storage.sync.get("popupStoreState", callback);
	}
}