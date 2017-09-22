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
		  console.log("connection query running")
		  res.json(results);
	  });
	});
 
	app.post("/api/friends", function(req, res) {
	  // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
	  // It will do this by sending out the value "true" have a table
	  console.log("this is running - app.post('api/friends')")
	  var query = connection.query("INSERT INTO friend_list SET ?", req.body, function(error, results, fields){
		if(error) throw error;
		console.log("the insert into DB was successful")
		});
	  });
  
  }; // function(app)