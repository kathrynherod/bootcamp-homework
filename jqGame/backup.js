	$(document).ready(function() {
	    //game object

	    var fight = {

	        picked: "",
	        selectionMade: false,

	        attackStarted: false,
	        playerSelected: "",
	        playerHealth: "",
	        opponentHealth: "",

	        writeStats: function() {
	            $("#health1").text("Health " + this.charTrump.health);
	            $("#health2").text("Health " + this.charPussy.health);
	            $("#health3").text("Health " + this.charHombre.health);
	            $("#health4").text("Health " + this.charMika.health);
	        },

	        charSelected: function() {
	            $("ul").on("click", ".btn", function() {
	                    //var picked = $(this).attr("id");

	                    picked = this.id;
	                    //console.log(picked);
	                    selectionMade = true;
	                    var colMd3 = "col-md-3 col-sm-3 col-xs-3";
	                    var colMd4 = "col-md-4 col-sm-4 col-xs-4";

	                    if (selectionMade === true) {

	                        $("#charInstructions").text("Choose an Opponent");
	                        $("ul").hide();
	                        $(".charDescript").remove();
	                        console.log(picked);
	                        var selectedID = "";
	                        var notSelectedIDs = [""];
	                        $("img").removeClass("img-sz-3").addClass("img-sz-4");
	                        var newTrumpBtn = "<div class='row' id='make-new-buttons'><div class='col-md-4 col-sm-4 col-xs-4'></div><div class='col-md-4 col-sm-4 col-xs-4'><button type='button' class='btn btn-primary center-block new-buttons' id='trumpBtn'>Battle trump</button></div><div class='col-md-4 col-sm-4 col-xs-4'></div></div>";
	                        var newPussyBtn = "<div class='row' id='make-new-buttons'><div class='col-md-4 col-sm-4 col-xs-4'></div><div class='col-md-4 col-sm-4 col-xs-4'><button type='button' class='btn btn-primary center-block new-buttons' id='pussyBtn'>Battle Pussy</button></div><div class='col-md-4 col-sm-4 col-xs-4'></div></div>";
	                        var newHombreBtn = "<div class='row' id='make-new-buttons'><div class='col-md-4 col-sm-4 col-xs-4'></div><div class='col-md-4 col-sm-4 col-xs-4'><button type='button' class='btn btn-primary center-block new-buttons' id='hombreBtn'>Battle Hombre</button></div><div class='col-md-4 col-sm-4 col-xs-4'></div></div>";
	                        var newMikaBtn = "<div class='row' id='make-new-buttons'><div class='col-md-4 col-sm-4 col-xs-4'></div><div class='col-md-4 col-sm-4 col-xs-4'><button type='button' class='btn btn-primary center-block new-buttons' id='mikaBtn'>Battle Mika</button></div><div class='col-md-4 col-sm-4 col-xs-4'></div></div>";

	                        if (picked === "trump") {
	                            selectedID = "#1";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#3", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd4);
	                            $("#you").attr("src", "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif");

	                            $(".pussyRow").after(newPussyBtn);
	                            $(".hombreRow").after(newHombreBtn);
	                            $(".mikaRow").after(newMikaBtn);

	                            $("#your-health-value").text(fight.charTrump.health);
	                        } else if (picked === "pussy") {
	                            selectedID = "#2";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#1", "#3", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd4);
	                            $("#you").attr("src", "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif");

	                            $(".trumpRow").after(newTrumpBtn);
	                            $(".hombreRow").after(newHombreBtn);
	                            $(".mikaRow").after(newMikaBtn);

	                            $("#your-health-value").text(fight.charPussy.health);

	                        } else if (picked === "hombre") {
	                            selectedID = "#3";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#1", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd4);
	                            $("#you").attr("src", "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif");

	                            $(".trumpRow").after(newTrumpBtn);
	                            $(".pussyRow").after(newPussyBtn);
	                            $(".mikaRow").after(newMikaBtn);

	                            $("#your-health-value").text(fight.charHombre.health);

	                        } else if (picked === "mika") {
	                            selectedID = "#4";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#3", "#1"];
	                            $(notSelectedIDs).toggleClass(colMd4);
	                            $("#you").attr("src", "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif");

	                            $(".trumpRow").after(newTrumpBtn);
	                            $(".pussyRow").after(newPussyBtn);
	                            $(".hombreRow").after(newHombreBtn);

	                            $("#your-health-value").text(fight.charMika.health);

	                        }

	                    } // end if selectionMade
	                    console.log(picked + " was picked")
	                    return picked;
	                })
	                // close $(document).on("click"function ()	
	        }, //close charSelected

	        selectFirstOpponent: function(firstOpponentSelected) {

	            if (firstOpponentSelected !== true) {
	                $("div").on("click", ".btn", function() {
	                        picked = this.id;
	                        console.log(picked);

	                        firstOpponentSelected = true;
	                        var colMd6 = "col-md-6 col-sm-6 col-xs-6";
	                        var colMd3 = "col-md-3 col-sm-3 col-xs-3";
	                        var colMd4 = "col-md-4 col-sm-4 col-xs-4";
	                        var healthID = "";

	                        $("img, #opponentImg").removeClass("img-sz-4").addClass("img-sz-6");
	                        if (picked === "trumpBtn") {
	                            selectedID = "#1";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#3", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd6);
	                            $("#opp").attr("src", "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif").removeClass("img-sz-6");

	                            $("#opp-health-value").text(fight.charTrump.health);
	                        }
	                        //if pussy chosen
	                        else if (picked === "pussyBtn") {
	                            selectedID = "#2";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#1", "#3", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd6);
	                            $("#opp").attr("src", "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif").removeClass("img-sz-6");

	                            $("#opp-health-value").text(fight.charPussy.health);

	                        }
	                        //if hombre chosen
	                        else if (picked === "hombreBtn") {
	                            selectedID = "#3";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#1", "#4"];
	                            $(notSelectedIDs).toggleClass(colMd6);
	                            $("#opp").attr("src", "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif").removeClass("img-sz-6");

	                            $("#opp-health-value").text(fight.charHombre.health);

	                        } else if (picked === "mikaBtn") {
	                            selectedID = "#4";
	                            $(selectedID).remove();
	                            notSelectedIDs = ["#2", "#3", "#1"];
	                            $(notSelectedIDs).toggleClass(colMd6);
	                            $("#opp").attr("src", "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif").removeClass("img-sz-6");

	                            $("#opp-health-value").text(fight.charMika.health);

	                        }
	                        $("#trumpBtn, #pussyBtn, #hombreBtn, #mikaBtn").hide();
	                        $("#attack-button").show()

	                    }) //close $("div").on("click", ".btn", function() 

	                $("#your-health").text("Your Health");
	                $("#opp-health").text("Opponent's Health");

	            }

	        },

	        attack: function() {


	            $("#attack-button").append("<button type='button' class='btn btn-primary center-block' id='attackBtn'>Attack the Enemy</button>").hide();
	            attackStarted = true;

	            playerHealth = parseInt($("#your-health-value").text());


	            $("#attackBtn").on("click", function() {
	                console.log("attack clicked");
	                console.log(playerHealth);

	            })
	            return attackStarted;

	        },

	        //character1-4 objects
	        charTrump: {
	            name: "trump",
	            health: 100,
	            attack: 2,
	            attackGain: this.attack * 1.5,
	            function() { console.log(attackGain) }
	        },
	        charPussy: {
	            name: "Pussy",
	            health: 200,
	            attack: 25
	        },
	        charHombre: {
	            name: "Hombre",
	            health: 150,
	            attack: 17
	        },
	        charMika: {
	            name: "Mika",
	            health: 130,
	            attack: 10
	        }
	    }
	    fight.writeStats();
	    fight.charSelected();
	    fight.selectFirstOpponent(false);
	    fight.attack();




	})
