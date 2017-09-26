document.body.innerHTML = '</head><body><div id="mainContent"><p id="clock">Time should go here</p></div>';

var myText = document.getElementById("clock");

function doSomething() {
    var d = new Date();
    var clock = d.getTime();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var day = d.getDate();
    myText.textContent = hours + ":" + minutes + ":" + seconds;
}

setInterval(function(){
    doSomething();
}, 1000);
