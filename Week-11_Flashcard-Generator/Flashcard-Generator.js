var makeCards = {
    init: function() {
        var bc = require("./BasicCard.js");
        var cc = require("./ClozeCard.js");
        var inquirer = require("inquirer");
        var chalk = require("chalk")
        var totalCards = 0;
        var kind = "";
        var myCards = [];
        this.inquirerWhichCard(inquirer, bc, myCards, cc, chalk);
    },
    inquirerWhichCard: function(inquirer, bc, myCards, cc, chalk) {
        inquirer.prompt([{
            type: "input",
            message: "\n\nWhich type of card do you want to make? Your options are: " + chalk.greenBright("basic") + " or " + chalk.greenBright("cloze") + "\n\n",
            name: "kind"
        }]).then(function(data) {
            data.kind = data.kind.toLowerCase();
            if (data.kind === "basic") {
                kind = "basic";
                console.log("--------> you're creating basic cards");
                makeCards.inquirerHowMany(inquirer, bc, kind, myCards, cc, chalk);
            } else if (data.kind === "cloze") {
                kind = "cloze";
                console.log("--------> you're creating cloze cards");
                makeCards.inquirerHowMany(inquirer, bc, kind, myCards, cc, chalk);
            } else {
                console.log(chalk.bold.red("\n\n==================>>> ERROR! TYPE ONLY 'basic' or 'cloze' <<<==================\n\n"));
                makeCards.inquirerWhichCard(inquirer, bc, myCards, cc, chalk);
            }
        });
    },
    inquirerHowMany: function(inquirer, bc, kind, myCards, cc, chalk) {
        inquirer.prompt([{
            type: "input",
            message: "\n\nHow many flash cards are you making?\n\n",
            name: "count"
        }]).then(function(data) {
            if (isNaN(data.count) === false) {
                console.log(kind)
                totalCards = data.count;
                var runThis = 0
                if (kind === "basic") {
                    makeCards.inquirerBasic(inquirer, bc, kind, totalCards, runThis, myCards, chalk);
                } else {
                    makeCards.inquirerCloze(inquirer, kind, totalCards, runThis, myCards, cc, chalk);
                }
            } else {
                console.log(chalk.bold.red("\n\n==================>>>  Please enter a NUMBER <<<==================\n\n"));
                makeCards.inquirerHowMany(inquirer, bc, kind, myCards, cc, chalk);
            }
        });
    },
    inquirerBasic: function(inquirer, bc, kind, totalCards, runThis, myCards, chalk) {
        var question = runThis + 1;
        var myChalk = chalk.greenBright.bold;
        if (question % 2 === 0) {
            myChalk = chalk.blue.bold;
        }
        inquirer.prompt([{
            name: "front",
            message: "\n\n" + myChalk("Enter Question #" + question + ".") + "\n For example: 'Who was the first president of the United States?'"
        }, {
            name: "back",
            message: myChalk("\nEnter the answer to question #" + question + ".")
        }])
        .then(function(card) {
            var newCard = new bc(question, card.front, card.back);
            myCards.push(newCard)
            runThis++;
            if (runThis < totalCards) {
                makeCards.inquirerBasic(inquirer, bc, kind, totalCards, runThis, myCards, chalk);
            } else {
                console.log(myCards)
            }
        });
    },
    inquirerCloze: function(inquirer, kind, totalCards, runThis, myCards, cc, chalk) {
        var question = runThis + 1;
        var myChalk = chalk.greenBright.bold;
        if (question % 2 === 0) {
            myChalk = chalk.blue.bold;
        }
        inquirer.prompt([{
            name: "full",
            message: "\n\n" + myChalk("Enter cloze statement #" + question + ".") + "\nFor example: 'George Washington was the first president of the United States'\n\n"
        }, {
            name: "cloze",
            message: "\n\n" + myChalk("Now enter the text you want removed from the previous statement. ") + "\nFor example: 'George Washington'"
        }]).then(function(card) {

            var newCard = new cc(question, card.full, card.cloze);
            myCards.push(newCard)
            runThis++;
            if (runThis < totalCards) {
                makeCards.inquirerCloze(inquirer, kind, totalCards, runThis, myCards, cc, chalk);
            } else {
                console.log(myCards)
            }
        });
    }
}

makeCards.init();