var app = document.getElementById('app');

const anchor = document.createElement('div');
anchor.id = 'app';

document.body.insertBefore(anchor, document.body.childNodes[0]);
document.getElementById('app').innerHTML += '<br>Some new content!';

// Content Script or popup
chrome.runtime.sendMessage({greeting: "hello"}, function(response){
  console.log(response);
});
