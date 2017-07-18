 //game object
 var fight = {
     //initialize functions
     init: function() {
         var initialRender = true;
         var clicked = "";
         $("body").on("click", ".btn", function() {
             clicked = $(this).attr("id");
             fight.handleClicks(clicked);
         });
         this.renderDom();
     },
     //write html to DOM
     renderDom: function() {

         var colMd3 = "<div class ='col-md-3 col-sm-3 col-xs-3' id='";
         var colMd4 = "<div class ='col-md-4 col-sm-4 col-xs-4' id='";
         var cDiv = "'</div>";
         var c1 = characters.c1;
         var c2 = characters.c2;
         var c3 = characters.c3;
         var c4 = characters.c4;
         if (initialRender = true) {
             //create the char columns
             for (i = 1; i < 5; i++) {
                 $("#choose-char").append(colMd3 + i + cDiv);
             }
             //char names
             $("#1").append("<h4 id='h1'>" + c1.name + "</h4>");
             $("#2").append("<h4 id='h2'>" + c2.name + "</h4>");
             $("#3").append("<h4 id='h3'>" + c3.name + "</h4>");
             $("#4").append("<h4 id='h4'>" + c4.name + "</h4>");

             //char details and buttons
             $("#h1").after("<button type='button' id='chooseBtn1'class='btn btn-success'>Choose trump</button>").after("<p id='health1'>Health " + c1.health + "</p>").after("<h5 id='tag1'>" + c1.tagline + "</h5>").after("<img class='img-responsive center-block img-sz-3' id='img1' src='" + c1.imgSrc + "'>");
             $("#h2").after("<button type='button' id='chooseBtn2'class='btn btn-success'>Choose Pussy</button>").after("<p id='health2'>Health " + c2.health + "</p>").after("<h5 id='tag2'>" + c2.tagline + "</h5>").after("<img class='img-responsive center-block img-sz-3' id='img2' src='" + c2.imgSrc + "'>");
             $("#h3").after("<button type='button' id='chooseBtn3'class='btn btn-success'>Choose Hombre</button>").after("<p id='health3'>Health " + c3.health + "</p>").after("<h5 id='tag3'>" + c3.tagline + "</h5>").after("<img class='img-responsive center-block img-sz-3' id='img3' src='" + c3.imgSrc + "'>");
             $("#h4").after("<button type='button' id='chooseBtn4'class='btn btn-success'>Choose Mika</button>").after("<p id='health4'>Health " + c4.health + "</p>").after("<h5 id='tag4'>" + c4.tagline + "</h5>").after("<img class='img-responsive center-block img-sz-3' id='img4' src='" + c4.imgSrc + "'>");
         }
         initialRender = false;
     },
     //click handlers
     handleClicks: function(getClicked, attacker, opponent) {
         var clickCounter = 0;
         var attacker = "";
         var opponent = "";
         var defenderCount = 0;
         if (getClicked === "chooseBtn1" || getClicked === "chooseBtn2" || getClicked === "chooseBtn3" || getClicked === "chooseBtn4") {
             this.makeAttacker(getClicked);
         }

         if (getClicked === "trumpBtn" || getClicked === "pussyBtn" || getClicked === "hombreBtn" || getClicked === "mikaBtn") {
             defenderCount++;
             this.createDef1(getClicked, defenderCount);

         }
         if (getClicked === "attackBtn") {
             //console.log(attacker + opponent);
             this.makePeeps();
         }
         if (getClicked === "playAgainYes") {
             location.reload();
         }
         if (getClicked === "playAgainNo") {
             $("#playAgainYes").hide();
             $("#playAgainNo").hide();
             $("#attack-button").append("<h2 id='loser'>Fine, you loser!</h2>");
         }

     },
     makeAttacker: function(picked) {
         $("#charInstructions").text("Choose an Opponent");
         $(".btn").hide();
         $(".charDescript").remove();
         var colMd3 = "col-md-3 col-sm-3 col-xs-3";
         var colMd4 = "col-md-4 col-sm-4 col-xs-4";
         $("#your-health").append("Your Health");
         var selectedID = "";
         var notSelectedIDs = [""];
         $("img").removeClass("img-sz-3").addClass("img-sz-4");
         var newTrumpBtn = "<button type='button' class='btn btn-primary center-block new-buttons' id='trumpBtn'>Battle trump</button>";
         var newPussyBtn = "<button type='button' class='btn btn-primary center-block new-buttons' id='pussyBtn'>Battle Pussy</button>";
         var newHombreBtn = "<button type='button' class='btn btn-primary center-block new-buttons' id='hombreBtn'>Battle Hombre</button>";
         var newMikaBtn = "<button type='button' class='btn btn-primary center-block new-buttons' id='mikaBtn'>Battle Mika</button>";
         $("#your-attack").text("Your Attack Power");
         //if trump
         if (picked === "chooseBtn1") {
             selectedID = "#1";
             $(selectedID).remove();
             $("#tag1, #tag2, #tag3, #tag4").remove();
             notSelectedIDs = ["#2", "#3", "#4"];
             $(notSelectedIDs).toggleClass(colMd4);
             $("#you").attr("src", "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif").attr("id", "trump");
             $("#health2").after(newPussyBtn);
             $("#health3").after(newHombreBtn);
             $("#health4").after(newMikaBtn);
             $("#your-health-value").text(characters.c1.health);
             $("#your-attack-value").text(characters.c1.attack);
         }
         //if pussy
         else if (picked === "chooseBtn2") {
             selectedID = "#2";
             $(selectedID).remove();
             $("#tag1, #tag2, #tag3, #tag4").remove();
             notSelectedIDs = ["#1", "#3", "#4"];
             $(notSelectedIDs).toggleClass(colMd4);
             $("#you").attr("src", "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif").attr("id", "pussy");
             $("#health1").after(newTrumpBtn);
             $("#health3").after(newHombreBtn);
             $("#health4").after(newMikaBtn);
             $("#your-health-value").text(characters.c2.health);
             $("#your-attack-value").text(characters.c2.attack);
         }
         //if hombre 
         else if (picked === "chooseBtn3") {
             selectedID = "#3";
             $(selectedID).remove();
             $("#tag1, #tag2, #tag3, #tag4").remove();
             notSelectedIDs = ["#2", "#1", "#4"];
             $(notSelectedIDs).toggleClass(colMd4);
             $("#you").attr("src", "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif").attr("id", "hombre");
             $("#health1").after(newTrumpBtn);
             $("#health2").after(newPussyBtn);
             $("#health4").after(newMikaBtn);
             $("#your-health-value").text(characters.c3.health);
             $("#your-attack-value").text(characters.c3.attack);
         } //if mika 
         else if (picked === "chooseBtn4") {
             selectedID = "#4";
             $(selectedID).remove();
             $("#tag1, #tag2, #tag3, #tag4").remove();
             notSelectedIDs = ["#2", "#3", "#1"];
             $(notSelectedIDs).toggleClass(colMd4);
             $("#you").attr("src", "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif").attr("id", "mika");
             $("#health1").after(newTrumpBtn);
             $("#health2").after(newPussyBtn);
             $("#health3").after(newHombreBtn);
             $("#your-health-value").text(characters.c4.health);
             $("#your-attack-value").text(characters.c4.attack);
         }
     },
     createDef1: function(picked, defNum) {
         $("#opp-attack").text("Opponent's Attack Power");
         var defNum = parseInt($("#defenderNumber").text())
         var colMd12 = "col-md-12 col-sm-12 col-xs-12";
         var colMd6 = "col-md-6 col-sm-6 col-xs-6";
         var colMd3 = "col-md-3 col-sm-3 col-xs-3";
         var colMd4 = "col-md-4 col-sm-4 col-xs-4";
         ;

         if (defNum === 2) {
             $(".row-3").attr("id", "final")
             $("#charInstructions").text("Opponents Remaining");
             console.log("defender 2");
             $("#opp-health").show();
             $("#opp-attack").show();
             $("#attack-button").show();
             $("img, #opponentImg").removeClass("img-sz-6").addClass("img-sz-12");

             if (picked === "trumpBtn") {
                 selectedID = "#1";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#3", "#4"];
                 $(notSelectedIDs).toggleClass(colMd12);
                 $("#opp").attr("src", "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif").attr("id", "trump");
                 $("#opp-health-value").text(characters.c1.health);
                 $("#opp-attack-value").text(characters.c1.attack);
             } else if (picked === "pussyBtn") {
                 selectedID = "#2";
                 $(selectedID).remove();
                 notSelectedIDs = ["#1", "#3", "#4"];
                 $(notSelectedIDs).toggleClass(colMd12);
                 $("#opp").attr("src", "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif").attr("id", "pussy");
                 $("#opp-health-value").text(characters.c2.health);
                 $("#opp-attack-value").text(characters.c2.attack);

             } else if (picked === "hombreBtn") {
                 selectedID = "#3";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#1", "#4"];
                 $(notSelectedIDs).toggleClass(colMd12);
                 $("#opp").attr("src", "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif").attr("id", "hombre");
                 $("#opp-health-value").text(characters.c3.health);
                 $("#opp-attack-value").text(characters.c3.attack);

             } else if (picked === "mikaBtn") {
                 selectedID = "#4";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#3", "#1"];
                 $(notSelectedIDs).toggleClass(colMd12);
                 $("#opp").attr("src", "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif").attr("id", "mika");
                 $("#opp-health-value").text(characters.c4.health);
                 $("#opp-attack-value").text(characters.c4.attack);
             }

         } else {

             $("#charInstructions").text("Opponents Remaining");

             var healthID = "";
             $(".btn").hide();
             var selectedID = "";
             var notSelectedIDs = [""];
             $("#opp-health").append("Opponent's Health");
             opponent = picked;
             $("img, #opponentImg").removeClass("img-sz-4").addClass("img-sz-6");

             if (picked === "trumpBtn") {
                 selectedID = "#1";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#3", "#4"];
                 $(notSelectedIDs).toggleClass(colMd6);
                 $("#opp").attr("src", "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif").removeClass("img-sz-6").attr("id", "trump");
                 $("#opp-health-value").text(characters.c1.health);
                 $("#opp-attack-value").text(characters.c1.attack);
             }
             //if pussy chosen
             else if (picked === "pussyBtn") {
                 selectedID = "#2";
                 $(selectedID).remove();
                 notSelectedIDs = ["#1", "#3", "#4"];
                 $(notSelectedIDs).toggleClass(colMd6);
                 $("#opp").attr("src", "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif").removeClass("img-sz-6").attr("id", "pussy");
                 $("#opp-health-value").text(characters.c2.health);
                 $("#opp-attack-value").text(characters.c2.attack);
             }
             //if hombre chosen
             else if (picked === "hombreBtn") {
                 selectedID = "#3";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#1", "#4"];
                 $(notSelectedIDs).toggleClass(colMd6);
                 $("#opp").attr("src", "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif").removeClass("img-sz-6").attr("id", "hombre");
                 $("#opp-health-value").text(characters.c3.health);
                 $("#opp-attack-value").text(characters.c3.attack);
             }
             // if mika chosen
             else if (picked === "mikaBtn") {
                 selectedID = "#4";
                 $(selectedID).remove();
                 notSelectedIDs = ["#2", "#3", "#1"];
                 $(notSelectedIDs).toggleClass(colMd6);
                 $("#opp").attr("src", "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif").removeClass("img-sz-6").attr("id", "mika");
                 $("#opp-health-value").text(characters.c4.health);
                 $("#opp-attack-value").text(characters.c4.attack);
             }
             $("#attack-button").append("<button type='button' class='btn btn-primary center-block' id='attackBtn'>Attack the Enemy</button>");
             $("#attack-button").show();
         }
         var testing123 = $("span").is("#finalOpp");
         console.log(testing123)
         if($("#finalOpp").text()==="FINAL"){
            console.log("working")
         }

     },
     makePeeps: function() {

         var you = $(".you").attr("id");

         if (you === "trump") {
             this.you = characters.c1;
         } else if (you === "pussy") {
             this.you = characters.c2;
         } else if (you === "hombre") {
             this.you = characters.c3;
         } else if (you === "mika") {
             this.you = characters.c4;
         }

         var opp = $(".opp").attr("id");

         if (opp === "trump") {
             this.opp = characters.c1;
         } else if (opp === "pussy") {
             this.opp = characters.c2;
         } else if (opp === "hombre") {
             this.opp = characters.c3;
         } else if (opp === "mika") {
             this.opp = characters.c4;
         }

         this.attack(this.you, this.opp);
     },

     attack: function(attacker, defender) {
         
         var holdValue = $(".row-3").is("#final");
         console.log(holdValue);


         if (attacker.health > 0) {

             attacker.health = attacker.health - defender.attack;
             defender.health = defender.health - attacker.attack;
             $("#your-health-value").text(attacker.health);
             $("#opp-health-value").text(defender.health);
             attacker.attack = (attacker.attack * 2);
             defender.attack = (defender.attack * 2);
             $("#your-attack-value").text(attacker.attack);
             $("#opp-attack-value").text(defender.attack);

             if (defender.health <= 0) {
                 if (defender.name === "Fake News Reporter") {
                     defender.name = "mika";
                 }
                 if (defender.name === "Bad Hombre") {
                     defender.name = "hombre";
                 }

                 if (holdValue===true) {
                    $("#charInstructions").html("You defeated " + defender.name + "! Choose your <span id='finalOpp'>FINAL</span> Opponent");

                 }
                 else {
                 $("#charInstructions").html("You defeated " + defender.name + "! Choose your <span id='defenderNumber'>" + 2 + "</span>nd Opponent");
                 }
                 $(".btn-primary").show();
                 $("#" + defender.name).removeAttr("src");
                 $("#" + defender.name).attr("id", "opp");
                 $("#opp-health").hide();
                 $("#opp-attack").hide();
                 $("#opp-health-value").text("");
                 $("#opp-attack-value").text("");
                 $("#attack-button").hide();
             }
             if (attacker.health <= 0) {

                 console.log("YOU LOSE")
                 $("#attackBtn").hide();
                 $(".row-3").remove();
                 $("#player-section").replaceWith("<div class='row' id='play-again'><div class='col-md-12 col-sm-12 col-xs12'><h3>You lost! Want to play again?</h3><br><img src='https://media.tenor.com/images/de67d070aa53aa72e6eb3c22094b47f4/tenor.gif'/></div></div>");
                 $("#attack-button").append("<button type='button' class='btn btn-primary center-block' id='playAgainYes'>Yes</button><button type='button' class='btn btn-primary center-block' id='playAgainNo'>No</button>");
                 //$("#attack-button").show();
             }

         }
     }
 }


 //character1-4 objects
 var characters = {
     c1: {
         colID: 1,
         name: "trump",
         tagline: "just. simply. the best.",
         imgSrc: "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif",
         buttonText: "Choose trump",
         health: 100,
         attack: 2,
     },
     c2: {
         colID: 2,
         name: "Pussy",
         tagline: "just grab it.",
         imgSrc: "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif",
         buttonText: "Choose Pussy",
         health: 200,
         attack: 5,
     },
     c3: {
         colID: 3,
         name: "Bad Hombre",
         tagline: "great at scaling vertical obstacles",
         imgSrc: "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif",
         buttonText: "Choose Bad Hombre",
         health: 150,
         attack: 4,
     },
     c4: {
         colID: 4,
         name: "Fake News Reporter",
         tagline: "all lies",
         imgSrc: "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif",
         buttonText: "Choose Mika",
         health: 130,
         attack: 3,

     }
 }

 $(document).ready(function() {
     fight.init();

 })
