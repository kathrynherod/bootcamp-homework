$(document).ready(function() {
    //game object

    var fight = {

        init: function() {
            this.renderDom();
        },

        renderDom: function() {
            var colMd3 = "<div class ='col-md-3 col-sm-3 col-xs-3' id='";
            var colMd4 = "<div class ='col-md-4 col-sm-4 col-xs-4' id='";
            var cDiv = "'</div>";
            var head4 = "<h4>";
            var cHead4 = "</h4>";
          

            var initialRender = true;

            if (initialRender = true) {
                //create the columns
                for (i = 1; i < 5; i++) {
                    $("#choose-char").append(colMd3 + i + cDiv);
                }

                $("#1").append(head4 + characters.c1.name + cHead4);
                $("#2").append(head4 + characters.c2.name + cHead4);
                $("#3").append(head4 + characters.c3.name + cHead4);
                $("#4").append(head4 + characters.c4.name + cHead4);

                //close.each
            }
            initialRender = false;
        }
    }

    var characters = { //character1-4 objects
        c1: {
            colID: 1,
            name: "trump",
            tagline: "just. simply. the best.",
            imgSrc: "https://media.giphy.com/media/CrcVLCRcwXJmg/giphy.gif",
            buttonText: "Choose trump",
            health: 100,
            attack: 2,
            attackGain: this.attack * 1.1
        },
        c2: {
            colID: 2,
            name: "Pussy",
            tagline: "just grab it.",
            imgSrc: "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif",
            buttonText: "Choose Pussy",
            health: 200,
            attack: 25,
            attackGain: this.attack * 2
        },
        c3: {
            colID: 3,
            name: "Bad Hombre",
            tagline: "great at scaling vertical obstacles",
            imgSrc: "https://media.giphy.com/media/j2nYebu8Fc62Y/giphy.gif",
            buttonText: "Choose Bad Hombre",
            health: 150,
            attack: 17,
            attackGain: this.attack * 1.7
        },
        c4: {
            colID: 4,
            name: "Fake News Reporter",
            tagline: "all lies",
            imgSrc: "https://media2.giphy.com/media/JGX6u6mtPD0Oc/giphy.gif",
            buttonText: "Choose Mika",
            health: 130,
            attack: 10,
            attackGain: this.attack * 1.4
        }
    }

    fight.init();
})
