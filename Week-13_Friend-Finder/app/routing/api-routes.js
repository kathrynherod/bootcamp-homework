// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var connection = require("../config/connection");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
				console.log("this is running - app.get('api/friends')");
				connection.query("SELECT * FROM friend_list ", function(err, results){
					console.log("connection query running");
					res.json(results);
					
				});//closes connection
		
	});//closes app.get

	app.post("/api/friends", function(req, res) {
				// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
				// It will do this by sending out the value "true" have a table
				console.log("this is running -> app.post('api/friends')");
				var query = connection.query("INSERT INTO friend_list SET ?", req.body, function(error, results, fields){
				if(error) throw error;
				console.log("the insert into DB was successful from the route");
					
				var currentFriend = [];
				var cf = req.body;
				currentFriend = [parseInt(cf.q1), parseInt(cf.q2), parseInt(cf.q3), parseInt(cf.q4), parseInt(cf.q5), parseInt(cf.q6), parseInt(cf.q7), parseInt(cf.q8), parseInt(cf.q9), parseInt(cf.q10)];
				console.log("TRYING TO SEND MATCH");
			//	console.log(match);
					analyzeData(currentFriend, function(match){
						res.send(match);
					});
				});//closes query
	});//closes app.post

	function analyzeData(currentFriend, cb) {
				connection.query("SELECT * FROM friend_list ", function (err, data) {
					if(err) throw err;
					var existingFriends = [];
					console.log(data);
					for (i = 0; i < (data.length-1); i++) {
						var f = data[i];
						var z = [];
						z = [f.q1, f.q2, f.q3, f.q4, f.q5, f.q6, f.q7, f.q8, f.q9, f.q10];
						existingFriends.push(z);
					}
					console.log( existingFriends);
					console.log(currentFriend);

					var diffArr = [];
					var currentDif = 0;
					//traverse all friends
					for (i = 0; i < existingFriends.length; i++) {
							//console.log("first for loop running");
							//traverse one friend at a time and compare to current
							for (j = 0; j < existingFriends[i].length; j++) {
									//console.log("second for loop running");
									var x = Math.abs(currentFriend[j] - existingFriends[i][j]);
									currentDif += x;
									if (j === 9) {
											console.log(currentDif);
											diffArr.push(currentDif);
											currentDif = 0;
									} //close if
							} //close for j

					} // close for i
					console.log(diffArr);
					//find lowest difference in array and grab index for id match			
					var bFF = diffArr.indexOf(Math.min.apply(null, diffArr)) + 1;
					var perMatch = ((40 - Math.min.apply(null, diffArr)) / 40 * 100) + "%";
					console.log("Percent match = " + perMatch);
					displayMatch(bFF, perMatch, cb);
				});//closes query
	}	// closes analyzeData
	
	function displayMatch(bFF, perMatch, cb) {
				
				connection.query("SELECT friend_name, friend_photo_url FROM friend_list WHERE friend_id = ?", bFF, function (err, friends) {
					if(err) throw err;
					console.log("displayMatch running");
					console.log(friends);
					var match = {
						name: friends[0].friend_name,
						photo: friends[0].friend_photo_url,
						percent: perMatch
					};
					console.log(match);
					cb(match);
					
				});//closes connection
		
	}//closes displayMatch
		
}; // function(app)