var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var twitter = new Twitter(keys.twitterKeys);
var tUser = "coding_kat"
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
var action = process.argv[2].toLowerCase();
var title = process.argv[3].toLowerCase();
var fourth = process.argv[4];

//START check if user types too many spaces
if (fourth != undefined) {
    console.log('\nx-x-x-x-x-x-x-x-x-x-x-x-x-x-E-R-R-O-R-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n\n-->>Please enter commands using dashes(-) for spaces:\n---->>>Example 1: my-tweets \n---->>>Example 2: spotify-this-song + song-title\n---->>>Example 3: movie-this + movie-name\n---->>>Example 4: do-what-it-says\n\n-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n')
}
//END check if user types too many spaces

//START get task
switch (action) {
    case "my-tweets":
        myTweets();
        break
    case "spotify-this-song":
        mySong();
}
//END get task

function myTweets() {
    twitter.get('statuses/user_timeline', tUser, function(error, tweets, response) {
        if (error) {
            console.log(error)
        }
        if (!error && response.statusCode === 200) {
            for (i = 19; i >= 0; i--) {
                console.log(i + 1)
                console.log(tweets[i].text);
            }
        }
    });
}

function mySong() {
    spotify.search({
        type: 'track',
        query: 'dancing in the moonlight'
    }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {

            console.log(data.tracks.items[0])
        }

        // Do something with 'data' 
    });
}