var triviaGame = {

    init: function() {
        //global vars
        var questionCount = -1;
        var correct = 0;
        var wrong = 0;
        var missed = 0;
        var userResponse = "";
        var x = "";
        var progress = "";
        $(".stats-row").hide();
        this.initialDom(correct, wrong, missed);
        //event listener
        var clicked = "";
        $("body").on("click", ".btn", function() {
            clicked = $(this).attr("id");
            questionCount++;
            triviaGame.handleClicks(clicked, questionCount);
        });
        $("body").on("click", "h4", function() {
            clicked = $(this).attr("id");
            triviaGame.handleClicks(clicked, questionCount, correct, wrong, missed);
            setTimeout(4000);
        });
    },
    handleClicks: function(getClicked, questionCount, correct, wrong, missed) {
        if (getClicked === "yes") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            this.writeQandA(questionCount);
        }
        if (getClicked === "no") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            $("#game-photo").attr("src", "https://media.tenor.com/images/2351748403da2d948da2271af3e57766/tenor.gif");
        }
        if (getClicked === "a0") {
            userResponse = 0;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a1") {
            userResponse = 1;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a2") {
            userResponse = 2;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "a3") {
            userResponse = 3;
            this.checkAnswer(userResponse, questionCount, correct, wrong, missed);
        }
        if (getClicked === "next") {
            this.writeQandA(questionCount);
        }
        if (getClicked === "finish") {
            this.resetGame();
        }
        if (getClicked === "playagain-yes") {
            location.reload();
        }
        if (getClicked === "playagain-no") {
            $("#question-row").hide();
            $("#stats-row").hide();
            $("#stats-correct-value").hide();
            $("#stats-wrong-value").hide();
            $("#stats-missed-value").hide();
            $("#stats-text").hide();
            $("#stats-text2").hide();
            $("#stats-text3").hide();
            $("#game-result").hide();
            $("#playagainquestion").hide();
            $("#playagainyes-btn").hide();
            $("#playagainno-btn").hide();
            $("#img-result").attr("src", "https://media.tenor.com/images/2351748403da2d948da2271af3e57766/tenor.gif");
        }
    },
    initialDom: function(correct, wrong, missed) {
        $(".answer-container").hide();
        $("#timer-holder").hide();
        $("#stats").hide();
        $("#questions").text("Are you ready to play Kat's Food Trivia Game?");
        $("#yes-btn").append("<button type='button' id='yes' class='btn btn-success'>Yes</button>");
        $("#no-btn").append("<button type='button' id='no' class='btn btn-danger'>No</button>");
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
    },
    writeQandA: function(questionCount) {
        var counter = 30;
        var clock;
        $("#continue-btn").hide();
        $("#game-photo").hide();
        var n = parseInt(questionCount);
        $(".answer-container").show();
        $(".stats-row").show();
        $("#stats").show();

        if (questionCount < questions.length) {
            this.timer(counter, clock, questionCount);
            $('#questions').text("Question " + (n + 1) + ": " + questions[n].question);
            $("#a0").text(questions[n].answers[0]);
            $("#a1").text(questions[n].answers[1]);
            $("#a2").text(questions[n].answers[2]);
            $("#a3").text(questions[n].answers[3]);
            $("#timer-holder").show();
        } else {
            this.resetGame();
        }
    },
    checkAnswer: function(uR, questionCount, correct, wrong, missed, counter) {
        clearInterval(countdown);
        correct = parseInt($("#stats-correct-value").text());
        wrong = parseInt($("#stats-wrong-value").text());
        missed = parseInt($("#stats-missed-value").text());
        $("#game-photo").show();
        $("#continue-btn").show();
        x = questionCount;
        var rightAnswer = questions[x].correctA;

        if (uR === rightAnswer) {
            $(".answer-container").hide();
            $("#questions").text("OMG! You're right!");
            $("#game-photo").attr("src", "https://68.media.tumblr.com/tumblr_m5curdbfBX1qm6oc3o1_500.gif");
            correct += 1;
        } else {
            $(".answer-container").hide();
            $("#questions").text("WRONG! You big dummy!");
            $("#game-photo").attr("src", "https://media.tenor.com/images/4cf7c083108bdaf001c937adbf83f153/tenor.gif");
            wrong += 1;
        }
        counter = 30;

        $("#timer-holder").hide();
        progress = x * 10 + 10;
        $("#update-progress").attr("aria-valuenow", progress);
        $("#update-progress").attr("style", "width:" + progress + "%");
        $("#update-progress").text(progress + "% complete")
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
        if (questionCount < 9) {
            $("#continue-btn").html("<button type='button' id='next' class='btn btn-success'>Next Question</button>");
        } else if (questionCount === 9) {
            $("#continue-btn").html("<button type='button' id='finish' class='btn btn-success'>Finish Game</button>");

        }
    },
    timesUp: function(questionCount, countdown) {
        clearInterval(countdown);
        $("#game-photo").show();
        $("#continue-btn").show();
        x = questionCount;
        correct = parseInt($("#stats-correct-value").text());
        wrong = parseInt($("#stats-wrong-value").text());
        missed = parseInt($("#stats-missed-value").text());
        $("#continue-btn").html("<button type='button' id='next' class='btn btn-success'>Next Question</button>");
        $("#timer-holder").hide();
        progress = x * 10 + 10;
        missed++;
        $(".answer-container").hide();
        $("#questions").text("OMG! You're so slow!");
        $("#game-photo").attr("src", "http://ak-hdl.buzzfed.com/static/2015-04/27/13/imagebuzz/webdr10/anigif_optimized-19983-1430157577-28.gif");
        $("#update-progress").attr("aria-valuenow", progress);
        $("#update-progress").attr("style", "width:" + progress + "%");
        $("#update-progress").text(progress + "% complete")
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
    },
    timer: function(counter, clock, questionCount) {
        countdown = setInterval(thirtySeconds, 1000);

        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(countdown);
                triviaGame.timesUp(questionCount, countdown);
            }
            if (counter > 0) {
                counter--;
            }
            $("#timer").html(counter);
        }
    },
    resetGame: function() {
        $("#finish").hide();
        $("#progress-area").hide();
        $("#questions").text("Game Over! Here are your stats");
        $("#game-photo").hide();
        //$(".stats-row").attr("style", "margin-top: -12.5vh");
        $("#stats-correct-value").attr("style", "margin-top: -10vh!important");
        $("#stats-wrong-value").attr("style", "margin-top: -10vh!important");
        $("#stats-missed-value").attr("style", "margin-top: -10vh!important");
        $("#stats-text").attr("style", "margin-top: -10vh!important");
        $("#stats-text2").attr("style", "margin-top: -10vh!important");
        $("#stats-text3").attr("style", "margin-top: -10vh!important");
        correct = parseInt($("#stats-correct-value").text());
        console.log(correct);
        if (correct === 10) {
            $("#game-result").text("Awesome Job! I'm shocked");
            $("#img-result").attr("src", "http://49.media.tumblr.com/5bf67f51efbf78051dd5d100b50f564f/tumblr_nypawv1gHl1rerytio1_500.gif");
        }
        if (correct > 7 && correct < 10) {
            $("#game-result").text("Not quite good enough!");
            $("#img-result").attr("src", "http://i.imgur.com/VAhyEDw.gif");

        }
        if (correct > 5 && correct < 7) {
            $("#game-result").text("What a disappointment");
            $("#img-result").attr("src", "https://chainlinkmarketing.com/wp-content/uploads/2017/04/Content-Marketing-Mistakes-Chainlink.gif");

        }
        if (correct <= 5) {
            $("#game-result").text("Wow! You're really not the sharpest knife in the kitchen!");
            $("#img-result").attr("src", "https://media.giphy.com/media/3oz8xTWROpGjQ68SZ2/source.gif");

        }
        $(".answer-container").hide();
        $("#timer-holder").hide();
        $("#stats").hide();
        $("#playagainquestion").text("Want to play again?");
        $("#playagainyes-btn").append("<button type='button' id='playagain-yes' class='btn btn-success'>Yes</button>");
        $("#playagainno-btn").append("<button type='button' id='playagain-no' class='btn btn-danger'>No</button>");

    }
}
var questions = [{
    "question": "Which spice comes from the dried stigmas of crocus flowers?",
    "answers": ["Saffron", "Turmeric", "Fennel", "Wasabi"],
    "correctA": 0

}, {
    "question": "What musical term describes a palate-cleansing course served between two larger courses?",
    "answers": ["Fortissimo", "Allegrito", "Intermezzo", "Pianissimo"],
    "correctA": 2
}, {
    "question": "Which type of pastry is used to make profiteroles?",
    "answers": ["Filo Dough", "Pâte à choux", "Puff Pastry", "Tart Dough"],
    "correctA": 1
}, {
    "question": "Which of the following is NOT a blue cheese?",
    "answers": ["Stilton", "Gorgonzola", "Camembert", "Roquefort"],
    "correctA": 2
}, {
    "question": "What is the more common, American name, for Mille-feuille",
    "answers": ["Éclair", "Macaron", "Sacher", "Napoleon"],
    "correctA": 3
}, {
    "question": "What does the Italian 'al dente' literally translate as?",
    "answers": ["To the taste", "To the tooth", "Slightly firm", "To the mouth"],
    "correctA": 1
}, {
    "question": "Which of these is NOT a type of mushroom?",
    "answers": ["Eel", "Morel", "Oyster", "Chanterelle"],
    "correctA": 0
}, {
    "question": "What usually makes yellow curry yellow, and red curry red, respectively?",
    "answers": ["Turmeric & Paprika", "Ginger & Beets", "Mustard & Red Peppers", "Saffron & Paprika"],
    "correctA": 0
}, {
    "question": "Which of these countries consumes the most sheep/lamb per capita?",
    "answers": ["United States", "Australia", "New Zealand", "Sudan", ],
    "correctA": 3
}, {
    "question": "Which of these countries consumes the most milk per capita?",
    "answers": ["Albania", "Finland", "Switzerland", "United States"],
    "correctA": 1
}]

triviaGame.init();
