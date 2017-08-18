 var liri = {
     init: function() {
         var keys = require("./keys.js");
         var request = require("request");
         var fs = require("fs");
         var Twitter = require("twitter");
         var twitter = new Twitter(keys.twitterKeys);
         var tUser = "coding_kat"
         var spotify = require("spotify");
         var action = process.argv[2].toLowerCase();
         var title = process.argv[3];
         var fourth = process.argv[4];
         var emoji = require('node-emoji');

         this.getTask(emoji, action, title, fourth, twitter, tUser);
         console.log("init running")
     },
     getTask: function(emoji, action, title, fourth, twitter, tUser) {
         //START check if user types too many spaces
         if (fourth != undefined) {
             var error = emoji.get('exclamation') + " " + emoji.get('fire') + " " + emoji.get('x') + " " + emoji.get('rage') + " ";
             error += error;
             var bird = emoji.get("baby_chick");
             var music = emoji.get("musical_note");
             var cinema = emoji.get("cinema");
             var point = emoji.get("point_right")
             console.log('\n\n' + error + '  E--R--R--O--R  ' + error + '\n\n')
             console.log('-->>Please enter commands using dashes(-) for spaces:\n')
             console.log('---->>> '+bird+ '  Example 1: my-tweets \n\n---->>> '+music+'  Example 2: spotify-this-song + song-title\n\n---->>> '+cinema+'  Example 3: movie-this + movie-name\n\n---->>> '+point+'  Example 4: do-what-it-says\n\n')
             console.log(error + error+error+'\n')
         } 
         //END check if user types too many spaces
         else {
             
             console.log("get task running")
             switch (action) {
                 case "my-tweets":
                     liri.myTweets(twitter, tUser);
             }
         }
     },
     myTweets: function(twitter, tUser) {
         console.log("twitter running")
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
 }
 liri.init();
 //console.log("action = " + action + " & title = " + title)
 /*
 my-tweets
 spotify-this-song
 movie-this
 do-what-it-says
 */