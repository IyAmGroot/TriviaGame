/////////////Build Card Object, Contains Q/A/Correct Choice///////////////
var myQuestion = ["Pick the best color."];
var myChoices = [["red", "blue", "green", "yellow"]];
// var myAnswers = [[], [], [], [], [], [], [], [], [], []];
var myAnswer = ["blue"];

function Card(q, c, a) {
  this.question = q;
  this.choices = c;
  this.answer = a;

  this.getQuestion = function() {
    return this.question;
  };
  this.getChoices = function() {
    return this.choices;
  };
  this.getAnswer = function() {
    return this.answer;
  };
}

///////////////Global Variables for processing/////////////////////
var cards = [],
  card;
for (var i = 0; i < myQuestion.length; i++) {
  cards[i] = new Card(myQuestion[i], myChoices[i], myAnswer[i]);
}

$(document).ready(function() {
  init();
  $(".ans").on("click", function() {
    var x = $(this).text();
    showAnswer(x);
  });
});
////////////////Functions////////////////////
function init() {
  //Show start btn, initialize all variables
  buildCard(0);
}
function buildCard(num) {
  card = cards[num];
  var qText = card.getQuestion();
  var choices = card.getChoices();
  var currQuestion = $("<h2></h2>").text(qText);
  console.log(qText);

  //Set Question Text
  $("#q1").append(currQuestion);

  //Set Choices Buttons
  for (var i = 0; i < choices.length; i++) {
    var text = $("<button class='ans btn btn-warning'></button>").text(
      choices[i]
    );
    $("#btn_a" + i).append(text);
  }
  //Set 10 second Timer
}
function showAnswer(choice) {
  $("#question").addClass("hide");
  if (choice === card.getAnswer()) {
    //Set span to CORRECT
  } else {
    //Set span to WRONG
  }

  //Show answer
  //show image/gif/etc..
  //set Timer to 5 seconds then go to next question
}
