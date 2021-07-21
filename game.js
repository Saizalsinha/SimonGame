var started = "false";
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];

function nextSequence() {

  $("h1").text("LEVEL " + level);
  level=level+1;console.log(level);
  var randomNumber = Math.floor((Math.random()) * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  userClickedPattern.length = 0;
}

$(".btn").click(function(event) {
  console.log("click");
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$("body").keypress(function() {
  if (started == "false") {
    console.log(started);
    nextSequence();
    started = "true";
  }
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Current same");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("last same");
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
var audio = new Audio('sounds/wrong.mp3');
audio.play();
$("body").addClass("game-over");
setTimeout(function (){
  $("body").removeClass("game-over");
},200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
  }
}

function startOver(){
  level=0;
  gamePattern.length=0;
  started="false";
}
