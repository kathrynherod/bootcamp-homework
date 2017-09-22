var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
        console.log("Should be displaying the homepage")
    });
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
        //res.sendFile(path.join(__dirname, "/../public/style.css"))
    });
    
   
}