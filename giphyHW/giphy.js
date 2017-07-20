$(document).ready(function() {
    myGiffy.init();

})

var myGiffy = {

    myGifs: ["mean girls", "cake fail", "puppies", "gordon ramsay"],
    userInput: "",

    init: function() {
        this.doApiStuff();
        this.renderButtons();
        this.clickHandler();
    },

    clickHandler: function() {

        $("#custom-add-btn").on("click", function(event) {
            event.preventDefault();
            myGiffy.something();


        })
    },

    something: function() {
        
        userInput = $("#giphy-input").val().trim();
        console.log(userInput);
        myGiffy.myGifs.push(userInput);
        this.renderButtons();

    },
    renderButtons: function() {
        $("#generate-buttons").empty();

        for (var i = 0; i < this.myGifs.length; i++) {

            var col6 = $("<div class='col-md-6' id='colID'" + i + "'>");
            var a = $("<button class='btn '>");
            a.addClass("myNewbuttons").attr("data-name", this.myGifs[i]).text(this.myGifs[i]);

            $("#generate-buttons").prepend(col6);
            $(col6).prepend(a);
        }

    },
    doApiStuff: function() {

        $.ajax({
            type: "GET",
            url: "https://api.giphy.com/v1/gifs/search?q=" + this.userInput + "&api_key=31e54a1c80e6430b9761f0be77f2301f&limit=5",

            success: function(data) {
                console.log(data);
            }
        })
    }
}