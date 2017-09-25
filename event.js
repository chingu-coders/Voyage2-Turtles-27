// Execute the content.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function doSomething (tab) {
  // When we get a result back from the doSomething
  // method, alert the data
  injectedMethod(tab, 'doSomething', function (response) {

    return true;
  });
}

// When the browser action is clicked, call the
// doSomething function.
chrome.browserAction.onClicked.addListener(doSomething);

// Background page

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.greeting == "hello"){
      sendResponse({farewell: "goodbye"})
    } else if(request.greeting == "yo"){
      sendResponse({farewell: "whaddup cuhh!"})
    }
    ;
  }
);


function backgroundFunction () {
    return "hello from the background!"
}
