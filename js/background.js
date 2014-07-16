var timeoutId = setTimeout(function(){popupClosed()}, 400);

function ping(){
	clearTimeout(timeoutId);
    	timeoutId = setTimeout(function(){popupClosed()}, 400);
}

function popupClosed() {
    chrome.browserAction.setIcon({path: '/icons/icon2.png'})
}