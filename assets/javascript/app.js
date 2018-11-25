/////////////Build Card Object, Contains Q/A/Correct Choice///////////////
var myQuestion = [
  "Who was Margaery Tyrell's first husband?",
  "What is the surname given to bastards born in Dorne?",
  "'The Mountain' is the nickname for which character?",
  "Who is known as 'The King Beyond the Wall'",
  "Who is the ruler of the Iron Islands at the beginning of Game of Thrones?",
  "Who was the Mad King's firstborn son?",
  "Who delivered the fatal blow to the King-in-the North, Robb Stark?",
  "Grey Worm and Missandei became allies of Daenerys Targaryen after she liberated the slaves of which city?",
  "Which rival king attempted to take King's Landing during the Battle of the Blackwater?",
  "In which city does Arya Stark train to become a Faceless Man?",
  "Thoros of Myr is responsible for reviving which character from the dead?",
  "Which is not a 'Game of Thrones' royal family name?",
  "What's the name of Arya Stark's sword?",
  "What disease was Jorah Mormont stricken with?",
  "Who said 'When you play the game of thrones, you win or you die?'"
];
var myChoices = [
  [
    "Renly Baratheon",
    "Tommen Baratheon",
    "Stannis Baratheon",
    "Joffrey Baratheon"
  ],
  ["Stone", "Sand", "Water", "Snow"],
  ["Oberyn Martell", "Gerold Clegane", "Sandor Clegane", "Gregor Clegane"],
  ["Mance Rayder", "The Night King", "Stannis Baratheon", "Tormund Giantsbane"],
  ["Euron Greyjoy", "Balon Greyjoy", "Yara Greyjoy", "Aeron Greyjoy"],
  [
    "Rhaegar Targaryen",
    "Aegon Targaryen",
    "Viserys Targaryen",
    "Aemon Targaryen"
  ],
  ["Walder Frey", "Roose Bolton", "Alliser Thorne", "Ramsay Bolton"],
  ["Meereen", "Qarth", "Yunkai", "Astapor"],
  ["Renly Baratheon", "Stannis Baratheon", "Balon Greyjoy", "Robb Stark"],
  ["Meereen", "Pentos", "Astapor", "Braavos"],
  ["Gregor Clegane", "Jon Snow", "Sandor Clegane", "Beric Dondarrion"],
  ["Stark", "Tyrell", "Targaryen", "Baelish"],
  ["Oathkeeper", "Ice", "Needle", "Death"],
  ["Measles", "Greyscale", "Stone Skin", "Dragon Stone"],
  ["Robert Baratheon", "Cersei Lannister", "Petyr Baelish", "Tyrion Lannister"]
];
var myAnswer = [
  "Renly Baratheon",
  "Sand",
  "Gregor Clegane",
  "Mance Rayder",
  "Balon Greyjoy",
  "Rhaegar Targaryen",
  "Roose Bolton",
  "Astapor",
  "Stannis Baratheon",
  "Braavos",
  "Beric Dondarrion",
  "Baelish",
  "Needle",
  "Greyscale",
  "Cersei Lannister"
];
var myImg = [
  "https://media.giphy.com/media/gB6G4EBX0jY3e/giphy.gif",
  "assets/images/dorne.jpg",
  "https://media.giphy.com/media/3o6ozA0QJTqtMK6QSI/giphy.gif",
  "https://media.giphy.com/media/dtEHiEK7mm36M/giphy.gif",
  "assets/images/BalonGreyjoy.jpg",
  "https://media.giphy.com/media/lAvy5R1QDGlSU/giphy.gif",
  "https://media.giphy.com/media/82HuyQCJLJB04/giphy.gif",
  "assets/images/Astapor.png",
  "https://media.giphy.com/media/4oQabjyOxA9Og/giphy.gif",
  "assets/images/Braavos.png",
  "https://media.giphy.com/media/YnJtEqVjz4O9q/giphy.gif",
  "https://media.giphy.com/media/7bHgjTv7Psfp6/giphy.gif",
  "https://media.giphy.com/media/5rvUoiNR8caS4/giphy.gif",
  "assets/images/greyscale.jpg",
  "https://media.giphy.com/media/tolFEWW90XwoE/giphy.gif"
];

function Card(q, c, a, i) {
  this.question = q;
  this.choices = c;
  this.answer = a;
  this.imageSrc = i;

  this.getQuestion = function() {
    return this.question;
  };
  this.getChoices = function() {
    return this.choices;
  };
  this.getAnswer = function() {
    return this.answer;
  };
  this.getSrc = function() {
    return this.imageSrc;
  };
}

///////////////Global Variables for processing/////////////////////
var cards = [],
  card,
  intervalId,
  timeCounter;
var yes = "https://media.giphy.com/media/jYUSrzF1iNaM0/giphy.gif";
var no = "https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif";
var bad = "https://media.giphy.com/media/Ob7p7lDT99cd2/giphy.gif";
var good = "https://media.giphy.com/media/UWFfiDzt6qIh2/giphy.gif";
var $button = [];
var page, correct, blankTot, wrongTot;
for (var i = 0; i < myQuestion.length; i++) {
  cards[i] = new Card(myQuestion[i], myChoices[i], myAnswer[i], myImg[i]);
}

$(document).ready(function() {
  $("#startBtn").on("click", function() {
    //start game.  display timer, hide start button
    $(".startGame").addClass("hide");
    init();
  });

  $(document).on("click", ".ans", function() {
    showAnswer($(this).text());
  });
});
////////////////Functions////////////////////
function init() {
  //Show start btn, initialize all variables
  page = 0;
  correct = 0;
  wrongTot = 0;
  blankTot = 0;
  buildCard(page);
}
function buildCard(num) {
  $("#gameTimer").removeClass("hide");
  $(".gameCard").removeClass("hide");
  $("#answer").addClass("hide");

  card = cards[num];
  var qText = card.getQuestion();
  var choices = card.getChoices();
  var currQuestion = $("<h3></h3>").text(qText);

  //Set Question Text
  $("#q1")
    .empty()
    .append(currQuestion);

  //Set Choices Buttons
  for (var i = 0; i < choices.length; i++) {
    $button[i] = $("<button></button>").text(choices[i]);
    $button[i].addClass("ans btn btn-warning");

    $("#btn_a" + i)
      .empty()
      .append($button[i]);
  }
  //Set 10 second Timer
  countDown();
}
function showAnswer(choice) {
  /*showAnswer hides gameCard (row with choice buttons), 
    stops, clears timer
    shows answer (row with confirmation of right/wrong & img, correct answer & img) 
    shows next question after 5 sec.*/
  clearInterval(intervalId);
  $(".gameCard").addClass("hide");
  $("#gameTimer").addClass("hide");
  $("#answer").removeClass("hide");
  stop();

  if (choice === card.getAnswer()) {
    //Set span to CORRECT
    $("#userMsg").html(
      "<h3>Correct!  That's what I do: I drink and I know things.</h3>"
    );
    $("#yesNo").attr("src", yes);
    correct++;
  } else {
    //Set span to WRONG
    $("#userMsg").html(
      "<h3>NO...  The night is dark and full of terrors...</h3>"
    );
    $("#yesNo").attr("src", no);
    if (choice === "") {
      blankTot++;
    } else {
      wrongTot++;
    }
  }

  //Render the answer & image
  $("#theAnswer").text(card.getAnswer());
  $("#answerPic").attr("src", card.getSrc());

  //set Timer to 5 seconds then go to next question
  //if all questions answered go to results
  setTimeout(function() {
    page++;
    if (page < 15) {
      buildCard(page);
    } else {
      endGame();
    }
  }, 1000 * 5);
}

function endGame() {
  //hide gameCard, gametimer, show end
  $("#answer").addClass("hide");
  $("#end").removeClass("hide");
  $(".startGame").removeClass("hide");
  var correctTotal = correct.toString();
  $("#myCorrect").html(correctTotal);
  $("#myWrong").html(wrongTot);
  $("#myBlank").html(blankTot);
  if (correctTotal < 9) {
    $("#endPic").attr("src", bad);
  } else {
    $("#endPic").attr("src", good);
  }

  //Set button text to Play again. Hide #end, reset counts, show first question.
  $("#startBtn")
    .text("Play Again?")
    .on("click", function() {
      $("#end").addClass("hide");
      $(".startGame").addClass("hide");
      init();
    });
}

/////TIMER FUNCTIONS////////
function countDown() {
  clearInterval(intervalId);
  timeCounter = 10;
  $("#timer").text(timeCounter);
  intervalId = setInterval(decrement, 1000);
}
function decrement() {
  $("#timer").text(timeCounter);
  if (timeCounter === 0) {
    stop();
    setTimeout(function() {
      $("#timer").text(timeCounter);
    }, 1000);
    var blank = "";
    showAnswer(blank);
  }
  timeCounter--;
}
function stop() {
  clearInterval(intervalId);
}
////////////////////////////
