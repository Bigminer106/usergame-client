var selectors = [];
var users = [];

window.onload = function() {
  console.log("Window loaded...");
  var URL = "http://localhost:3000/users";
  loadUsers(URL);
  addListeners();
}

function loadUsers(_URL) {
  $.get(_URL).then(onData);
}

function loadGames(_URL) {
  $.get(_URL).then(onGamesData);
}

function onData(users) {
  showUsers(users);
}

function onGamesData(gamesData) {
  console.log("Game data " , gamesData);
  showGameData(gamesData);
}

function addListeners() {
  document.addEventListener("click", onClick);
}

function showUsers(result) {
  for(var i = 0; i < result.length; i++) {
    // document.body.innerHTML += users[i].email;
    users[i] = result[i];
    console.log("User " , users[i].id)
    createSelector(i);
  }
}

function showGameData(gameData) {
  var separator = "------------------------"
  for (var i = 0; i < gameData.length; i++) {
    if(i == gameData.length - 1) {
      separator = "";
    }
    document.getElementsByClassName("output")[0].innerHTML += "</br>" + gameData[i].title + "</br>" + " esrb: " + gameData[i].esrb
    + "</br>" + " Rating: " + gameData[i].rating + "</br>" +
    separator;
  }
}

function createSelector(id) {
  var button = document.createElement("Button");
  button.style.backgroundColor = "#4466CC";
  button.style.color = "#EEEEEE";
  button.id = id  ;
  button.style.margin = "2% auto";
  button.style.width = "50%";
  button.style.height = "20%";
  button.style.display = "block";
  button.innerHTML = users[id].email;
  button.style.fontSize = "1.5rem";
  $(".container").append(button);
  selectors.push(button);
}

function onClick(event) {
  // console.log("Clicked ", users[event.target.id]);
  if(event.target.id) {
  $(".output").html(users[event.target.id].email +  "<br>" +  users[event.target.id].created_at);
  let userId = users[event.target.id].id;
  loadGames("http://localhost:3000/users/"+userId+"/games");
  }
}
