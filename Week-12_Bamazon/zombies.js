var inquirer = require('inquirer');

var zombieHealth = 70;
var myHealth = 15;
var randomDamage;

console.log('Zombie Health: ' + zombieHealth);
console.log('My Health: ' + myHealth);

var question = [{
    name: 'guess',
    message: 'Guess a random number between 1 and 5?'
}];

var game = function() {
    if (zombieHealth !== 0 && myHealth !== 0) {
        inquirer.prompt(question).then(function (answers) {
            var zombieNumber = Math.floor(Math.random() * 6);
            if (zombieNumber === Number(answers.guess)) {
                randomDamage = Math.floor(Math.random() * 6);
                zombieHealth = zombieHealth - randomDamage;
            } else {
                randomDamage = Math.floor(Math.random() * 6);
                myHealth = myHealth - randomDamage;
            }
            console.log('Random Number' + zombieNumber);
            console.log('My Guess: ' + answers.guess);
            console.log('-------------------------------')
            console.log('Zombie Health: ' + zombieHealth);
            console.log('My Health: ' + myHealth);
            game();
            console.log('\n*********************************')
        });
    }
}
game();