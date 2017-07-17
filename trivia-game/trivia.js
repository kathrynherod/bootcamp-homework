var triviaGame = {

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
            triviaGame.handleClicks(clicked, questionCount);
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

    writeQandA: function(questionCount) {
    	var n = questionCount;
        $(".answer-container").show();
        $("#timer-holder").show();
        $("#stats").show();

        if (questionCount < questions.length) {

            $('#questions').text(questions[n].question);

            for (var i = 0; i < questions[n].question.length; i++) {
                $("#answer1").text(questions[n].answers[0]);
                $("#answer2").text(questions[n].answers[1]);
                $("#answer3").text(questions[n].answers[2]);
                $("#answer4").text(questions[n].answers[3]);
            }

            
        } else {
            resetGame();
        }
    },

    handleClicks: function(getClicked, questionCount) {

        if (getClicked === "yes") {
            $("#yes-btn").hide();
            $("#no-btn").hide();
            this.writeQandA(questionCount);

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
        setTimeout(wait, 4000); //  change to 4000 or other amount

    }

}

var questions = [

    {
        "question": "Which herb comes from the dried stigmas of crocus flowers?",
        "answers": ["Saffron", "Turmeric", "Fennel", "Wasabi"],
        "correctA": 0

    }, {
        question: "What musical term describes a palate-cleansing course served between two larger courses?",
        answers: ["Fortissimo", "Allegrito", "Intermezzo", "Pianissimo"],
        correctA: 2
    }, {
        question: "Which type of pastry is used to make profiteroles?",
        answers: ["Filo Dough", "Pâte à choux", "Puff Pastry", "Tart Dough"],
        correctA: 1

    }, {
        question: "Which of the following is NOT a blue cheese?",
        answers: ["Stilton", "Gorgonzola", "Camembert", "Roquefort"],
        correctA: 2

    }, {
        question: "What is the more common, American name, for Mille-feuille",
        answers: ["Éclair", "Macaron", "Sacher", "Napoleon"],
        correctA: 3

    }, {
        question: "What does the Italian 'al dente' literally translate as?",
        answers: ["To the taste", "To the tooth", "Slightly firm", "To the mouth"],
        correctA: 1
    }, {
        question: "Which of these is NOT a type of mushroom?",
        answers: ["Eel", "Morel", "Oyster", "Chanterelle"],
        correctA: 0
    }, {
        question: "What usually makes yellow curry yellow, and red curry red, respectively?",
        answers: ["Turmeric & Paprika", "Ginger & Beets", "Mustard & Red Peppers", "Saffron & Paprika"],
        correctA: 0
    }, {
        question: "Which of these countries consumes the most sheep/lamb per capita?",
        answers: ["United States", "Australia", "New Zealand", "Sudan", ],
        correctA: 3
    }, {
        question: "Which of these countries consumes the most milk per capita?",
        answers: ["Albania", "Finland", "Switzerland", "United States"],
        correctA: 1
    }


]

triviaGame.init();
