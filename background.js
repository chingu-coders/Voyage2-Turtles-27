
chrome.browserAction.onClicked.addListener(function() {
  // The event page will unload after handling this event (assuming nothing
  // else is keeping it awake). The content script will become the main way to
  // interact with us.
  chrome.tabs.create({url: "http://google.com"}, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
    });
  });
});
