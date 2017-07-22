var userLink = {
    init: function() {
        this.clickHandler();

    },

    clickHandler: function() {
        $("#get-link-btn").on("click", function(e) {
            e.preventDefault();
            userLink.processInput();
        })



    },
    processInput: function() {
        var userInput = $("#repo-input").val().trim();
        console.log(userInput)
        console.log("testing")

        var stringSplit1 = userInput.split("/");
        console.log(stringSplit1);
        var newString = [];
        newString[0] = stringSplit1[0];
        newString[1] = "//";
        newString[2] = stringSplit1[3];

        newString[3] = ".github.io";


        if (stringSplit1.length > 6) {
            for (var i = 4; i < stringSplit1.length; i++) {
                if (i === 5) {
                    i++;
                }
                if (i === 6) {
                    i++;
                }
                newString[i] = "/" + stringSplit1[i];

            }
            console.log("long");
        }
        var newUrl = newString.join('');

        $("#generated-link").text(newUrl)

    },

}
$(document).ready(function() {
    userLink.init();
})