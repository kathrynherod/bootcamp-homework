window.onload = function hideThis() {
    var hide = document.getElementById("show-game");
    hide.style.display = "none";
}

//Global Variables// //Global Variables// //Global Variables// 

var easyWords = ["hippopotamus", "telephone", "vegetables", "javascript", "statement"];
var mediumWords = ["hangman", "jellybean", "watermelon", "developer", "chocolate"];
var hardWords = ["fruit", "sugar", "photo", "apple", "jump"];
var selectedGameType = "";
var currentWord = "";
var wl = 0;
var guessesRemaining = 0;
var drawBlanks = 0;

//Global Variables// //Global Variables// //Global Variables// 

//Global Functions// //Global Functions// //Global Functions// 

document.addEventListener("click", function(e) {
    if ((e.target.id === "easy") || (e.target.id === "medium") || (e.target.id === "hard")) {
     
        var targetID = event.target.id;
        startTheGame(targetID);
    }
    if (e.target.id ==="a") {
    	var letterID = event.target.id;
    	console.log(letterID);
    	letterGuessed(letterID);
    	
    }

});

//Global Functions// //Global Functions// //Global Functions// 


// CHOOSE DIFFICULTY LEVEL CHOOSE DIFFICULTY LEVEL CHOOSE DIFFICULTY LEVEL

function startTheGame(targetID) {
    //    document.addEventListener('click', function(stg) {

    var selectedGameType = targetID;

    console.log("Game type selected is: " + selectedGameType);
    var hideDisplay = document.getElementById("hide-menu");
    hideDisplay.style.display = "none";
    var showDisplay = document.getElementById("show-game");
    showDisplay.style.display = "block";

    if (selectedGameType === "easy") {
        var pickEasyWord = easyWords[Math.floor(Math.random() * easyWords.length)];
        console.log(pickEasyWord);
        currentWord = pickEasyWord.split("");
    } else if (selectedGameType === "medium") {
        var pickMediumWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
        console.log(pickMediumWord);
        currentWord = pickMediumWord.split("");
    } else if (selectedGameType === "hard") {
        var pickHardWord = hardWords[Math.floor(Math.random() * hardWords.length)];
        console.log(pickHardWord);
        currentWord = pickHardWord.split("");
    }

    console.log(currentWord);
    var wl = currentWord.length;

    document.getElementById("wordTime").innerHTML = "Time to play Hangman!";
    document.getElementById("wordLength").innerHTML = "The first word you have to guess is " + wl + " letters long.";
    var guessesRemaining = 7;
    document.getElementById("guessesLeft").innerHTML = "You have " + guessesRemaining + " chances to guess the word.";
    var drawBlanks = "";

    for (i = 0; i < wl; i++) {
        drawBlanks = drawBlanks + " __ ";
    }

    document.getElementById("displayBlanks").innerHTML = drawBlanks;
    //        }) // CLOSE document.addEventListener('click', function(stg)
} //CLOSE startThe Game

var guessesRemaining = 8;
var wrongGuesses = 0;


function letterGuessed() {


 //   document.addEventListener('click', function(gtl) {

     

                    if (g1 < 0) {
                        document.getElementById(letterID).style.backgroundColor = "red";
                        guessesRemaining--;
                    } else {
                        document.getElementById(firstGuess).style.backgroundColor = "green";
                    }

 //       }) //CLOSE document.addEventListener('click', function(e)



} //CLOSE letterGuessed







// CHOOSE DIFFICULTY LEVEL CHOOSE DIFFICULTY LEVEL CHOOSE DIFFICULTY LEVEL
