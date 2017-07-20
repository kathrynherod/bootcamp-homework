$(document).ready(function() {
    myGiffy.init();

})

var myGiffy = {

    myArray: ["mean girls", "cake fail", "puppies", "gordon ramsay", "goats", "i love javascript"],
    userInput: "",

    init: function() {

        this.renderButtons();
        this.clickHandler();
        $("#gif-results").hide();
    },

    clickHandler: function() {

        $("#custom-add-btn").on("click", function(event) {
            event.preventDefault();
            myGiffy.processUserInput();
        })
        $(document).on("click", ".myNewbuttons", function() {
            var gifSelected = $(this).attr("data-name");
            $("#gif-results").text("Here are your gifs of " + gifSelected + "!").show();
            myGiffy.doApiStuff(gifSelected);
        })
        $(document).on("click", ".myNewGifs", function() {

            var state = $(this).attr("data-state");
            var gifClicked = this;
            myGiffy.manipulateGifs(state, gifClicked);
        })
    },

    processUserInput: function() {

        userInput = $("#giphy-input").val().trim();
        console.log(userInput);
        myGiffy.myArray.push(userInput);
        this.renderButtons();

    },
    renderButtons: function() {

        $("#generate-buttons").empty();

        for (var i = 0; i < this.myArray.length; i++) {

            var col6 = $("<div class='col-md-6' id='colID'" + i + ">");
            var a = $("<button class='btn '>");
            a.addClass("myNewbuttons").attr("data-name", this.myArray[i]).text(this.myArray[i]);

            $("#generate-buttons").prepend(col6);
            $(col6).prepend(a);
        }
    },

    renderGifs: function(data) {
        $("#generate-gifs").empty();

        for (var i = 0; i < 12; i++) {

            var col3 = $("<div class='col-md-3'><div class='panel panel-default' id='panelID" + i + "'><div class='panel-body'>");
            var a = $("<img class='image-responsive center-block '>");
            a.addClass("myNewGifs");
            a.attr("data-still", data[i].images.downsized_still.url);
            a.attr({
                "src": data[i].images.downsized_still.url,
                "data-still": data[i].images.downsized_still.url,
                "data-animate": data[i].images.fixed_height_downsampled.url,
                "data-state": "still"
            });
            var rating = "Rating " + data[i].rating;
            var ratingText = $("<div class='panel-footer'>" + rating + "</div>")

            $("#generate-gifs").append(col3);
            $("#panelID" + i).append(a);
            $("#panelID" + i).append(ratingText)
        }
    },

    doApiStuff: function(gifSelected) {

        $.ajax({
            type: "GET",
            url: "https://api.giphy.com/v1/gifs/search?q=" + gifSelected + "&api_key=31e54a1c80e6430b9761f0be77f2301f&limit=12"
        }).done(function(response) {
            console.log(response)
            var writeGifs = response.data;
            myGiffy.renderGifs(writeGifs);
        })
    },

    manipulateGifs: function(state, gifClicked) {
         console.log(state)

        if (state === "still") {
            $(gifClicked).attr("src", $(gifClicked).attr("data-animate"));
            $(gifClicked).attr("data-state", "animate");
        } else {
            $(gifClicked).attr("src", $(gifClicked).attr("data-still"));
            $(gifClicked).attr("data-state", "still");
        }
    }
}