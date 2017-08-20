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
        var timeDiff = 0;
        var trainHr = "";
        var trainMin = "";
        firebase.initializeApp(config);
        var database = firebase.database();
        this.renderDom(database);
        this.handleClicks(submitCounter, database);
    },
    renderDom: function(database) {
        var timeHrSel = $("#train-time-hr");
        var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        //$("#current-time").text("Current time: " + currentTime)
        for (var i = 0; i < 24; i++) {
           
                $(timeHrSel).append("<option id='hr-" + [i] + "'>" + [i]);
            
        }
        for (var j = 0; j < 6; j++) {
            $("#train-time-min1").append("<option id='min1-" + [j] + "'>" + [j]);
        }
        for (var jj = 0; jj < 10; jj++) {
            $("#train-time-min2").append("<option id='min2-" + [jj] + "'>" + [jj]);
        }

        database.ref().on("child_added", function(data) {

            trainHr = data.val().timeHr;
            console.log(data)
            trainMin = data.val().timeMin;
            trainTime = trainHr + ":" + trainMin;
            trainFrequency = data.val().frequency;

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted);
            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % trainFrequency;
            console.log(tRemainder);    

            // Minute Until Train
            var tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            nextTrain = moment(nextTrain).format("hh:mm a");
            console.log("ARRIVAL TIME: " + nextTrain);

            $("#example-1").append("<tr><td>" + data.val().name + "</td><td>" + data.val().destination + "</td><td>" + data.val().frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td>");
        })
    },
    handleClicks: function(submitCounter, database) {
        $("#submit").on("click", function() {

            event.preventDefault();

            trainName = $("#train-name").val().trim();
            trainDestination = $("#destination").val().trim();
            trainTimeHr = $("#train-time-hr").val().trim();
            trainTimeMin1 = $("#train-time-min1").val().trim();
            trainTimeMin2 = $("#train-time-min2").val().trim();
            trainFrequency = $("#frequency").val().trim();
            trainHr = parseInt(trainTimeHr);
            trainMin = trainTimeMin1 + trainTimeMin2;
            trainMin = parseInt(trainMin);

            database.ref().push({

                name: trainName,
                destination: trainDestination,
                timeHr: trainHr,
                timeMin: trainMin,
                frequency: trainFrequency
            });
            trainScheduler.appendDom(database);

        })

    },
    appendDom: function(database) {
        database.ref().on("value", function(data) {

            //$("#highest-bidder").html(data.val().highBidder);
            //$("#highest-price").html(data.val().highPrice);

            //$("#example-1").after("<tr><td>"+data.val().Train1[0]+"</td><td>"+data.val().Train1[1]+"</td><td>"+data.val().Train1[3]+"</td>")
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