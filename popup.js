

document.getElementById('clicker').addEventListener("click", myScript);

function myScript(e){
  // chrome.runtime.sendMessage({greeting: "hello"}, function(response){
  //   console.log(response);
  // });
  console.log('yo')


}

(function () {
    var otherWindows = chrome.extension.getBackgroundPage();
    console.log(otherWindows.backgroundFunction());
})();

// Content Script or popup
chrome.runtime.sendMessage({greeting: "yo"}, function(response){
  console.log(response);
  chrome.extension.getBackgroundPage().console.log('yo', response);
});
