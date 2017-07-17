var triviaGame = {

    questions: {

        q1: {
            question: "Which herb comes from the dried stigmas of crocus flowers?",
            correctAnswer: "Saffron",
            wrongAnswer1: "Turmeric",
            wrongAnswer2: "Fennel",
            wrongAnswer3: "Wasabi"
        },
        q2: {
            question: "What musical term describes a palate-cleansing course served between two larger courses?",
            correctAnswer: "Intermezzo",
            wrongAnswer1: "Fortissimo",
            wrongAnswer2: "Pianissimo",
            wrongAnswer3: "Allegrito"
        },
        q3: {
            question: "Which type of pastry is used to make profiteroles?",
            correctAnswer: "Pâte à choux",
            wrongAnswer1: "Puff Pastry",
            wrongAnswer2: "Filo Dough",
            wrongAnswer3: "Tart Dough"
        },
        q4: {
            question: "Which of the following is NOT a blue cheese?",
            correctAnswer: "Camembert",
            wrongAnswer1: "Roquefort",
            wrongAnswer2: "Stilton",
            wrongAnswer3: "Gorgonzola"
        },
        q5: {
            question: "What is the more common, American name, for Mille-feuille",
            correctAnswer: "Napoleon",
            wrongAnswer1: "Sacher",
            wrongAnswer2: "Macaron",
            wrongAnswer3: "Éclair"
        },
        q6: {
            question: "What does the Italian 'al dente' literally translate as?",
            correctAnswer: "To the tooth",
            wrongAnswer1: "To the taste",
            wrongAnswer2: "Slightly firm",
            wrongAnswer3: "To the mouth"
        },
        q7: {
            question: "Which of these is NOT a type of mushroom?",
            correctAnswer: "Eel",
            wrongAnswer1: "Morel",
            wrongAnswer2: "Oyster",
            wrongAnswer3: "Chanterelle"
        },
        q8: {
            question: "What usually makes yellow curry yellow?",
            correctAnswer: "Turmeric",
            wrongAnswer1: "Mustard",
            wrongAnswer2: "Ginger",
            wrongAnswer3: "Saffron"
        },
        q9: {
            question: "Which of these countries consumes the most sheep/lamb per capita?",
            correctAnswer: "Sudan",
            wrongAnswer1: "United States",
            wrongAnswer2: "Australia",
            wrongAnswer3: "New Zealand"
        },
        q10: {
            question: "Which of these countries consumes the most milk per capita?",
            correctAnswer: "Finland",
            wrongAnswer1: "Switzerland",
            wrongAnswer2: "Albania",
            wrongAnswer3: "United States"
        }
    },

    init: function() {
        this.initialDom();

        //global vars
        var counter = 30;
        var clock;
        var questionCount = 0;
        var correct = 0;
        var wrong = 0;
        var missed = 0;


        //event listener
        var clicked = "";
        $("body").on("click", ".btn", function() {
            clicked = $(this).attr("id");
            triviaGame.handleClicks(clicked);
        });

        //timer
        this.timer(counter, clock);
    },

    initialDom: function() {
        $(".answer-container").hide();
        $("#timer-holder").hide();
        $("#stats").hide();
        $("#questions").text("Are you ready to play Kat's Food Trivia Game?");
        $("#yes-btn").append("<button type='button' id='yes' class='btn btn-success'>Yes</button>");
        $("#no-btn").append("<button type='button' id='no' class='btn btn-danger'>No</button>");
    },

    writeQandA: function() {
        $(".answer-container").show();
        $("#timer-holder").show();
        $("#stats").show();

        for (var i = 1; i < 11; i++) {
            var qn = "q" + i;
            $("#questions").text(qn);
        }
    },

    handleClicks: function(getClicked) {

        if (getClicked === "yes") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            this.writeQandA();

        }
        if (getClicked === "no") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            console.log("no")
            $("#game-photo").attr("src", "https://media.tenor.com/images/2351748403da2d948da2271af3e57766/tenor.gif");
        }
    },

    timer: function(counter, clock) {
        countdown = setInterval(thirtySeconds, 1000);

        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(countdown);
                this.timesUp();
            }
            if (counter > 0) {
                counter--;
            }
            $("#timer").html(counter);
        }
    },

    timesUp: function() {
    	setTimeout(wait, 4000);  //  change to 4000 or other amount

    }

}

triviaGame.init();
