var buttonColours = ["red", "blue", "green", "yellow"];

var userPickPattern = [];
var gamePattern = [];

var start = false;
var level = 0;

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequece();
    start = true;
  }
});

$(".dot").click(function() {
  var userPickButton = $(this).attr("id");
  userPickPattern.push(userPickButton);

  playSound(userPickButton);
  animatePress(userPickButton);

  checkResult(userPickPattern.length - 1);
});

checkResult = currentLevel => {
  if (gamePattern[currentLevel] === userPickPattern[currentLevel]) {
    if (userPickPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequece();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

nextSequece = () => {
  userPickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
};

animatePress = currentColor => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

playSound = name => {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

startOver = () => {
  level = 0;
  gamePattern = [];
  start = false;
};
