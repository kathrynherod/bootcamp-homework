var triviaGame = {

    init: function() {
        $(".stats-row").hide();

        //global vars

        var questionCount = -1;
        var correct = 0;
        var wrong = 0;
        var missed = 0;
        var userResponse = "";
        var x = "";
        var progress = "";
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
            resetGame();
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
        counter=30;
        $("#continue-btn").html("<button type='button' id='next' class='btn btn-success'>Next Question</button>");
        $("#timer-holder").hide();
        progress = x * 10 + 10;
        $("#update-progress").attr("aria-valuenow", progress);
        $("#update-progress").attr("style", "width:" + progress + "%");
        $("#update-progress").text(progress + "% complete")
        $("#stats-correct-value").text(correct);
        $("#stats-wrong-value").text(wrong);
        $("#stats-missed-value").text(missed);
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
            console.log("counter " + counter);
        }
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
