var makeCards = {

    init: function() {
        var bc = require("./BasicCard.js");
        var inquirer = require("inquirer");
        var totalCards = 0;
        var kind = "";
        var myCards = [];
        this.inquirerWhichCard(inquirer, bc, myCards);
    },
    inquirerWhichCard: function(inquirer, bc, myCards) {

        inquirer.prompt([{
            type: "input",
            message: "Which type of card do you want to make? Your options are: basic or cloze",
            name: "kind"
        }]).then(function(data) {

            if (data.kind === "Basic" || "basic" || "BASIC") {
                kind = "basic";
                console.log("--------> this makes basic cards");
                makeCards.inquirerHowMany(inquirer, bc, kind, myCards);
            } else {
                kind = "cloze";
                console.log("--------> this makes cloze cards");

            }
        });
    },
    inquirerHowMany: function(inquirer, bc, kind, myCards) {

        inquirer.prompt([{
            type: "input",
            message: "How many flash cards are you making?",
            name: "count"
        }]).then(function(data) {

            if (isNaN(data.count) === false) {
                console.log(kind)
                totalCards = data.count;
                console.log("now go create cards function");
                if (kind === "basic") {
                    console.log("go run basic card function")
                    var runThis = 0
                    makeCards.inquirerBasic(inquirer, bc, kind, totalCards, runThis, myCards);
                } else {
                    console.log("go run cloze card function")
                }

            } else {
                console.log("--------> Please enter a NUMBER.");
                makeCards.inquirerHowMany(inquirer, bc, kind);
            }
        });
    },

    inquirerBasic: function(inquirer, bc, kind, totalCards, runThis, myCards) {
    	
        inquirer.prompt([{
            name: "front",
            message: "Enter a question. For example: 'Who was the first president of the United States?'"
        }, {
            name: "back",
            message: "Enter the answer to the question."
        }]).then(function(card) {

            var newCard = new bc(card.front, card.back);
            myCards.push(newCard)
            runThis++;
            if (runThis < totalCards) {
                makeCards.inquirerBasic(inquirer, bc, kind, totalCards, runThis, myCards);
            } else {
                console.log(myCards)
            }
        });
    }

}

makeCards.init();