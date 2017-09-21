// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// Set our port to 8080
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));
app.use(express.static(__dirname + '/../public'));

require('./app/routing/html-routes.js')(app);
require('./app/routing/api-routes.js')(app);

//init mysql
var mysql = require('mysql');
var sql = {
    con: mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "rootpassword",
        //database: "friends_db"
    })
}
//connect to mysql
sql.con.connect(function(err) {
    if (err) { throw err; }
    console.log("Connected to Database!");
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
});
});