$(document).ready(function(){
/***
*Weather widget
**/

$.getJSON("https://freegeoip.net/json/", function(json) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + json.latitude + "&lon=" + json.longitude + "&units=imperial&appid=03f010544045f1772f781cfaf70d9cdd", function(x) {
      var f = Math.round(x.main.temp) * 100 / 100;
        console.log(f);
    $("#weather").html(" <div><img src='http://openweathermap.org/img/w/" + x.weather[0].icon + ".png'/><span> | "+f+"&deg; F</span></div>");
  });
});
/***
*TODO widget
**/
  //login to firebase
  var email = 'tony@mrbrackins.com';
  var password = 'P@ssword1';
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user){
      console.log(user)
    })

    var currentUser = firebase.auth().currentUser;

    // LOAD UP todos



  //cross out todo
    $('.todo_list').on("click", "li", function changeCSS(){
        $(this).toggleClass('todo_completed');
        // console.log('yo!!: ' +  $(this).attr("uid"))
        // deleteTodos($(this).attr("uid"));

    });

    // delete todo
    $('.todo_list').on("click",'.todo_X', function(e){
      // prevent "bubble up"
      e.preventDefault();
      e.stopPropagation();

      $(this).parent().fadeOut(500, function removeAfterFadeOut(){
          $(this).remove();
          deleteTodos($(this).attr("uid"));
    });

    console.log('yo!!: ' +  $(this).attr("uid"))
    // deleteTodos($(this).parent().attr("uid"));
});

  //add todo
  $('.todo_input').keypress(function hitEnter(e){
    if(e.which == 13){
      console.log('thisvale: ',$(this).val() )
        saveTodos($(this).val());
        //I think the bug is here somewhere
        $(this).val('');
    };
  });

  var loaded = false;

  $('#fetchTodos').click(function(){

    console.log('from #fetchtodos')
    if(loaded == false){
      fetchTodos();
    }
    loaded = true;
    $('#todo_container').toggle({'display': 'none'});
    // $(this).toggle({'display': 'none'});

  });

//toggle todo input

$('.icon-plus').click(function(){

  $('.todo_input').fadeToggle();


});




});


// var myButton = document.getElementById("clickButton");
var myText = document.getElementById("clock");

// myButton.addEventListener('click', doSomething, false)


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
    console.log("do something");
}, 1000);


// ======== CHANGE BACKGROUND FUNCTION =========
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function changeBackground() {

    var client = new HttpClient();
    client.get('https://api.unsplash.com/photos/random/?client_id=f1a98c4f258ca33b9175aaa05f96adbeb130f4ae831458b358111c06e413bc4c', function(response) {
        var responseJSON = JSON.parse(response);
        var randomImageUrl = responseJSON.urls.regular;
        document.querySelector('body').style.backgroundImage = 'url(' + randomImageUrl + ')';
        // fetchTodos();
    });

}

function getTodos(id) {

}

function saveTodos(todo) {
  var currentUser = firebase.auth().currentUser;
  firebase.database().ref('/users/' + currentUser.uid + '/todos')
  .push({todo:{todo:todo,id: Date.now()}
  }).then(function(){
    console.log('pushed')
    console.log(this);
  });

}

function deleteTodos(uid) {
  var currentUser = firebase.auth().currentUser;
  firebase.database().ref('/users/' + currentUser.uid + '/todos/' + uid)
  .remove().then(function(){
    console.log('ish was deleted');
  });

}

function fetchTodos() {

  var currentUser = firebase.auth().currentUser;
  firebase.database().ref('/users/' + currentUser.uid + '/todos')
  .on('child_added', function(snapshot){
    var the_objects = snapshot.val();
    console.log(getParent(snapshot));
    console.log(snapshot.key);


    _.map(the_objects, function(val, uid){
      return  $('.todo_list').prepend('<li class="todo_item" uid='+ snapshot.key+' "><span class="todo_X"><i class="icon-trash"></i></span> ' + the_objects.todo.todo +  ' </li>');

      console.log('fetching todos from the function')
    })
  });

}

function getParent(snapshot) {
  // You can get the reference (A Firebase object) from a snapshot
  // using .ref().
  var ref = snapshot.ref;
  // Now simply find the parent and return the name.
  return ref.parent.val;
}


// var the_todos = _.map(todos, function(val, uid){
//   return {val, uid}
// })



changeBackground();

console.log(_)
