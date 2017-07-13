var hangmanGame = {



        hide: document.getElementById("show-game"),
        dudesHead: document.getElementById("dudes-head"),
        dudesHeadDead: document.getElementById("dudes-head-dead"),
        dudesBody: document.getElementById("dudes-body"),
        dudesLeftArm: document.getElementById("dudes-left-arm"),
        dudesArms: document.getElementById("dudes-arms"),
        dudesLeftLeg: document.getElementById("dudes-left-leg"),
        dudesRightLeg: document.getElementById("dudes-right-leg"),
        keyboard: document.getElementById("keyboard-inner"),
        playAgain: document.getElementById("play-again"),

        hideTheseThingsOnPageLoad: function() {

            hangmanGame.hide.style.display = "none";
            hangmanGame.dudesHead.style.display = "none";
            hangmanGame.dudesHeadDead.style.display = "none";
            hangmanGame.dudesBody.style.display = "none";
            hangmanGame.dudesLeftArm.style.display = "none";
            hangmanGame.dudesArms.style.display = "none";
            hangmanGame.dudesLeftLeg.style.display = "none";
            hangmanGame.dudesRightLeg.style.display = "none";
            hangmanGame.keyboard.style.display = "none";
            hangmanGame.playAgain.style.display = "none";

        },

        //set global vars
        easyWords: ["hippopotamus", "telephone", "vegetables", "javascript", "statement"],
        mediumWords: ["hangman", "jellybean", "watermelon", "developer", "chocolate"],
        hardWords: ["fruit", "sugar", "photo", "apple", "jump"],
        selectedGameType: "",
        currentWord: "",
        wl: 0,
        gameLosses: 0,
        gameWins: 0,
        usersWord: "",
        playAgainResponse: "",

        displayInstructions: function() {

            if (hangmanGame.wl > 0) {

                //Output instructions, word length, and keyboard

                document.getElementById("wordTime").innerHTML = "Time to play Hangman!";
                var guessesRemaining = 7;
                document.getElementById("guessesLeft").innerHTML = "You have " + hangmanGame.guessesRemaining + " guesses remaining before YOU LOSE.";

                var keyboard = document.getElementById("keyboard-inner");
                keyboard.style.display = "block";

                wordGoesHere = document.getElementById("Display-Blanks");
                createP = document.createElement("ul");

                //display blanks based on word length
                for (var i = 0; i < hangmanGame.currentWord.length; i++) {

                    //makeBlank = "___";
                    drawBlanks = document.createElement("li");
                    drawBlanks.setAttribute("id", "Blanks" + i);
                    drawBlanks.innerHTML = " __ ";
                    createP.appendChild(drawBlanks);

                    //console.log("testing to see if working " + i);
                }
                //////////////////////////////////////

                //write the blanks/letters on the screen
                wordGoesHere.appendChild(createP);

            } //end if (hangmanGame.wl > 0)

        }, // end displayInstructions

        letterGuessed: function(letterClicked) {

            //assign letter guessed to variable
            var letterID = event.target.id;
            console.log(letterID);
            //document.getElementById("displayBlanks").innerHTML = hangmanGame.drawBlanks;

            if (hangmanGame.guessesRemaining > 1) {

                //find the letter in the array - figure out its index 
                var firstGuess = letterID;
                // console.log("Letter guessed is " + firstGuess);
                var g1 = hangmanGame.currentWord.indexOf(firstGuess);
                //console.log(hangmanGame.currentWord);
                ////////////////////////////////////////////////////////

                for (var i = 0; i < hangmanGame.currentWord.length; i++) {
                    if (hangmanGame.currentWord[i] === firstGuess) {
                        // console.log("index position is " + i);
                        blankPosition = document.getElementById("Blanks" + i);
                        blankPosition.innerHTML = "  " + firstGuess + "  ";
                        hangmanGame.usersWord[i] = firstGuess;
                        //console.log(hangmanGame.usersWord);
                    }
                }

                //if the player guesses wrong, change the letter bg color to red
                if (g1 < 0) {

                    document.getElementById(letterID).style.backgroundColor = "red";

                    //decrease the number of guesses the user has
                    hangmanGame.guessesRemaining--;

                    // triggers function to draw the hangman
                    hangmanGame.drawTheDude();
                }

                //if the player guesses right, change the letter bg color to green 
                else {

                    document.getElementById(firstGuess).style.backgroundColor = "green";

                }

                document.getElementById("wordLength").innerHTML = "The first word you have to guess is " + hangmanGame.wl + " letters long.";
                document.getElementById("guessesLeft").innerHTML = "You have " + hangmanGame.guessesRemaining + " guesses remaining before YOU LOSE.";

                //function to see if the user has won
                hangmanGame.winTheGame(hangmanGame.usersWord, hangmanGame.currentWord);

            } //CLOSE if (guessesRemaining < 0)
            else {

                // display text when user loses
                document.getElementById("wordLength").innerHTML = "YOU LOSE!!!!"
                document.getElementById("guessesLeft").innerHTML = '"For in that sleep of death what dreams may come..."<br> - Hamlet Act 3, Scene 1, Line 65';

                //swap out heads
                var dudesHead = document.getElementById("dudes-head");
                dudesHead.style.display = "none";
                var dudesHeadDead = document.getElementById("dudes-head-dead");
                dudesHeadDead.style.display = "block";

                //increase user loss points
                hangmanGame.gameLosses++;

                //display score
                document.getElementById("wordTime").innerHTML = "The score is --> You: " + hangmanGame.gameWins + " Kat: " + hangmanGame.gameLosses;

                hangmanGame.playGameAgain();


                for (var i = 0; i < hangmanGame.currentWord.length; i++) {

                    blankPosition = document.getElementById("Blanks" + i);
                    blankPosition.innerHTML = "  " + hangmanGame.currentWord[i] + "  ";
                }
            }
            //       }) //CLOSE document.addEventListener('click', function(e)
        }, //CLOSE letterGuessed

        winTheGame: function(uWord, cWord) {
            var indexMatches = 0;
            //console.log({uWord, cWord})
            for (var i = 0; i < cWord.length; i++) {

                if (cWord[i] === uWord[i]) {
                    indexMatches++;
                }
            }
            if (cWord.length === indexMatches) {

                document.getElementById("wordLength").innerHTML = "YOU WIN!!!!"
                document.getElementById("guessesLeft").innerHTML = "Great job, smartypants!";
                hangmanGame.gameWins++;
                //console.log(hangmanGame.gameLosses);
                document.getElementById("wordTime").innerHTML = "The score is --> You: " + hangmanGame.gameWins + " Kat: " + hangmanGame.gameLosses;

                hangmanGame.playGameAgain();
            }
        },

        playGameAgain: function() {

            hangmanGame.playAgainResponse = event.target.id;
            console.log(hangmanGame.playAgainResponse)

            //hide the keyboard
            var keyboardInner = document.getElementById("keyboard-inner");
            keyboardInner.style.display = "none";

            //show play again options
            var playAgain = document.getElementById("play-again");
            playAgain.style.display = "block";

            hangmanGame.gameResponse();


        },
        gameResponse: function() {

            if (hangmanGame.playAgainResponse === "yes") {
                console.log("TESTING");
                ///////hide the menu & show the game screen////////////
                var showDisplayInGameResponse = document.getElementById("show-game");
                // hangmanGame.hide.innerHTML = '';
                showDisplayInGameResponse.style.display = "none";
                var hideDisplayingame = document.getElementById("hide-menu");
                hideDisplayingame.style.display = "block";


                //hangmanGame.startTheGame();

            }





        },

        drawTheDude: function() {

            if (hangmanGame.guessesRemaining === 6) {
                //console.log("testing the drawing feature");
                var dudesHead = document.getElementById("dudes-head");
                dudesHead.style.display = "block";
            }

            if (hangmanGame.guessesRemaining === 5) {

                var dudesBody = document.getElementById("dudes-body");
                dudesBody.style.display = "block";
            }

            if (hangmanGame.guessesRemaining === 4) {

                var dudesBody = document.getElementById("dudes-body");
                dudesBody.style.display = "none";

                var dudesLeftArm = document.getElementById("dudes-left-arm");
                dudesLeftArm.style.display = "block";
            }

            if (hangmanGame.guessesRemaining === 3) {
                var dudesLeftArm = document.getElementById("dudes-left-arm");
                dudesLeftArm.style.display = "none";

                var dudesArms = document.getElementById("dudes-arms");
                dudesArms.style.display = "block";
            }
            if (hangmanGame.guessesRemaining === 2) {
                var dudesLeftLeg = document.getElementById("dudes-left-leg");
                dudesLeftLeg.style.display = "block";
            }

            if (hangmanGame.guessesRemaining === 1) {

                var dudesRightLeg = document.getElementById("dudes-right-leg");
                dudesRightLeg.style.display = "block";
            }

        },

        startTheGame: function() {

            document.addEventListener("click", function(e) {
                // console.log('event is ' + e.target.id);

                ///////hide the menu & show the game screen////////////
                var hideDisplay = document.getElementById("hide-menu");
                hideDisplay.style.display = "none";

                var showDisplay = document.getElementById("show-game");
                showDisplay.style.display = "block";

                //////////////////////////////////////////////////////

                if ((e.target.id === "easy") || (e.target.id === "medium") || (e.target.id === "hard")) {

                    selectedGameType = e.target.id;
                    //console.log("Game type selected is: " + selectedGameType);

                    if (selectedGameType === "easy") {

                        var pickEasyWord = hangmanGame.easyWords[Math.floor(Math.random() * hangmanGame.easyWords.length)];
                        //console.log("Word to guess is " + pickEasyWord);
                        hangmanGame.currentWord = pickEasyWord.split("");
                        //console.log(hangmanGame.currentWord);
                    } else if (selectedGameType === "medium") {
                        var pickMediumWord = hangmanGame.mediumWords[Math.floor(Math.random() * hangmanGame.mediumWords.length)];
                        // console.log("Word to guess is " + pickMediumWord);
                        hangmanGame.currentWord = pickMediumWord.split("");
                    } else if (selectedGameType === "hard") {
                        var pickHardWord = hangmanGame.hardWords[Math.floor(Math.random() * hangmanGame.hardWords.length)];
                        // console.log("Word to guess is " + pickHardWord);
                        hangmanGame.currentWord = pickHardWord.split("");
                    }
                    hangmanGame.wl = hangmanGame.currentWord.length;
                    // console.log("Word is " + hangmanGame.wl + " letters long");

                    hangmanGame.usersWord = new Array(hangmanGame.wl);
                    //console.log(hangmanGame.usersWord);

                    //call Functions
                    hangmanGame.displayInstructions();
                    hangmanGame.letterGuessed(e.target.id);


                }; /// end of if e.target.id...


            }); ///end document.addEventListener("click", function(e) 

        }, //end startThe Game

        guessesRemaining: 8,
        drawBlanks: ""

    } //end HangmanGame
