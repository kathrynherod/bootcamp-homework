var liri = {
    init: function() {
        var keys = require("./keys.js");
        var request = require("request");
        var fs = require("fs");
        var Twitter = require("twitter");
        var twitter = new Twitter(keys.twitterKeys);
        var tUser = "coding_kat"
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotifyKeys);

        var action = process.argv[2].toLowerCase();
        var title = process.argv[3];
        for (i = 4; i < 25; i++) {
            if (process.argv[i] !== undefined || null) {
                title += " " + process.argv[i];
            } else {
                break
            }
        }
        var emoji = require('node-emoji');
        fs.appendFile("log.txt",
            "\n -x-x-x-x-x-x-x-x-x-x- L-O-G  E-N-T-R-Y -x-x-x-x-x-x-x-x-x-x-\n\n" +
            action + " ==>> " + title + "\n\n",
            function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        this.getTask(emoji, action, title, twitter, tUser, spotify, title, request, fs);
    },
    getTask: function(emoji, action, title, twitter, tUser, spotify, title, request, fs) {
        if (action === "my-tweets" || "spotify-this-song" || "movie-this" || "do-what-it-says") {
            switch (action) {
                case "my-tweets":
                    liri.myTweets(twitter, tUser, fs);
                    break;
                case "spotify-this-song":
                    if (title === undefined || null) {
                        title = "The-Sign";
                    }
                    liri.mySong(emoji, spotify, title, fs);
                    break
                case "movie-this":
                    if (title === undefined || null) {
                        title = "Mr. Nobody";
                    }
                    liri.myMovie(emoji, title, request, fs)
                    break
                case "do-what-it-says":
                    liri.doWhat(emoji, action, title, twitter, tUser, spotify, title, request, fs);
            }
        }
        //START check if user types too many spaces
        else {
            var cinema = emoji.get("cinema") + " ";
            var error = emoji.get('exclamation') + " " + emoji.get('fire') + " " + emoji.get('x') + " " + emoji.get('rage') + " ";
            error += error;
            var bird = emoji.get("baby_chick");
            var music = emoji.get("musical_note");
            var point = emoji.get("point_right")
            console.log('\n\n' + error + '  E--R--R--O--R  ' + error + '\n\n')
            console.log('-->>Please enter commands using dashes(-) for spaces:\n')
            console.log('---->>> ' + bird + '  Example 1: my-tweets \n\n---->>> ' + music + '  Example 2: spotify-this-song + song title\n\n---->>> ' + cinema + '  Example 3: movie-this + movie name\n\n---->>> ' + point + '  Example 4: do-what-it-says\n\n')
            console.log(error + error + error + '\n')
        }
        //END check if user types too many spaces
    },
    myTweets: function(twitter, tUser, fs) {
        console.log("twitter running")
        twitter.get('statuses/user_timeline', tUser, function(error, tweets, response) {
            if (error) {
                console.log(error)
            }
            if (!error && response.statusCode === 200) {
                for (i = 19; i >= 0; i--) {
                    console.log(i + 1)
                    console.log(tweets[i].text);
                    fs.appendFile("log.txt", tweets[i].text + "\n", function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            }
        });
    },
    mySong: function(emoji, spotify, title, fs) {
        spotify.search({
            type: 'track',
            query: title
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var res = data.tracks.items[0]
            var music = emoji.get('musical_note') + " ";
            music += music;
            console.log('\n' + music + music + music + music + music + " R-E-S-U-L-T-S " + music + music + music + music + music + '\n')
            console.log("Song Title: " + res.name + '\n');
            console.log("Artist: " + res.artists[0].name + '\n')
            console.log("Album: " + res.album.name + '\n')
            console.log("Preview URL: " + res.preview_url + '\n')
            console.log('\n' + music + music + music + music + music + music + music + music + music + music + music + music + music + music + '\n')

            fs.appendFile("log.txt",
                "Song Title: " + res.name + "\n" +
                "Artist: " + res.artists[0].name + '\n' +
                "Album: " + res.album.name + '\n' +
                "Preview URL: " + res.preview_url + '\n',
                function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });

        });
    },
    myMovie: function(emoji, title, request, fs) {
        var cinema = emoji.get("cinema") + " ";
        title = title.split(' ').join('+');
        var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
        request(queryUrl, function(err, data, body) {
            body = JSON.parse(body);
            console.log('\n' + cinema + cinema + cinema + cinema + cinema + " R-E-S-U-L-T-S " + cinema + cinema + cinema + cinema + cinema + '\n')
            if (body.Title === undefined) {
                console.log("sorry - we aren't cool enough to know that movie")
                fs.appendFile("log.txt", "sorry - we aren't cool enough to know that movie"+'\n',
                    function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

            } else {
                console.log("Title:                  " + body.Title + '\n');
                console.log("Release Year:           " + body.Year);
                console.log("IMDB Rating:            " + body.imdbRating)
                console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value)
                console.log("Production Country:     " + body.Country)
                console.log("Language:               " + body.Language)
                console.log("Actors:                 " + body.Actors)
                console.log("Plot:                   " + body.Plot)

                fs.appendFile("log.txt",
                    "Title:                  " + body.Title + '\n' +
                    "Release Year:           " + body.Year + '\n' +
                    "IMDB Rating:            " + body.imdbRating + '\n' +
                    "Rotten Tomatoes Rating: " + body.Ratings[1].Value + '\n' +
                    "Production Country:     " + body.Country + '\n' +
                    "Language:               " + body.Language + '\n' +
                    "Actors:                 " + body.Actors + '\n' +
                    "Plot:                   " + body.Plot + '\n',
                    function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
            }
            console.log('\n' + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + cinema + '\n')



        })
    },
    doWhat: function(emoji, action, title, twitter, tUser, spotify, title, request, fs) {
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log(data);
                var dataArr = data.split(",");
                action = dataArr[0];
                title = dataArr[1];
                liri.getTask(emoji, action, title, twitter, tUser, spotify, title, request, fs);
            }
        })
    }
}
liri.init();