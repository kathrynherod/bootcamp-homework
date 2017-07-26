var trainScheduler = {
    init: function() {
        var trainName = "";
        var trainDestination = "";
        var trainTimeHr = "";
        var trainTimeMin1 = "";
        var trainTimeMin2 = "";
        var trainFrequency = "";
        var trainTime = "";
        var submitCounter = 0;
        firebase.initializeApp(config);
        var database = firebase.database();
        this.renderDom();
        this.handleClicks(submitCounter, database);
    },
    renderDom: function() {
        var timeHrSel = $("#train-time-hr");

        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                $(timeHrSel).append("<option id='hr-0" + [i] + "'>" + "0" + [i]);
            } else {
                $(timeHrSel).append("<option id='hr-" + [i] + "'>" + [i]);
            }
        }
        for (var j = 0; j < 10; j++) {
            $("#train-time-min1").append("<option id='min1-" + [j] + "'>" + [j]);
        }
        for (var jj = 0; jj < 10; jj++) {
            $("#train-time-min2").append("<option id='min2-" + [jj] + "'>" + [jj]);
        }
    },
    handleClicks: function(submitCounter, database) {
        $("#submit").on("click", function() {

            event.preventDefault();
           
            trainName = $("#train-name").val().trim();
            trainDestination = $("#destination").val().trim();
            trainTimeHr = $("#train-time-hr").val().trim();
            trainTimeMin1 = $("#train-time-min1").val().trim();
            trainTimeMin2 = $("#train-time-min1").val().trim();
            trainFrequency = $("#frequency").val().trim();
            trainTime = trainTimeHr + ":" + trainTimeMin1 + trainTimeMin2;

            console.log(trainName, trainDestination, trainTime, trainFrequency)

            database.ref().set({
                Train1: [trainName, trainDestination, trainTime, trainFrequency]
            });
            trainScheduler.appendDom(database);

        })

    },
    appendDom: function(database) {
        database.ref().on("value", function(snapshot) {

            $("#highest-bidder").html(snapshot.val().highBidder);
            $("#highest-price").html(snapshot.val().highPrice);

            $("#example-1").after("<tr><td>"+snapshot.val().Train1[0]+"</td><td>"+snapshot.val().Train1[1]+"</td><td>"+snapshot.val().Train1[3]+"</td>")
        })
    }

}
var config = {
    apiKey: "AIzaSyBQHVb7SiA48tNIrcv_i-xlIxdB07GDuqQ",
    authDomain: "trainsched-e41b1.firebaseapp.com",
    databaseURL: "https://trainsched-e41b1.firebaseio.com",
    projectId: "trainsched-e41b1",
    storageBucket: "trainsched-e41b1.appspot.com",
    messagingSenderId: "1048696307887"
}
trainScheduler.init();