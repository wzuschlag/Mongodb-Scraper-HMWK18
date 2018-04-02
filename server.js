// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
// Serve static content
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);
// ******** need to make this correct for my homework ************
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/MongoScraperHMWK18");
// mongoose.connect("mongodb://heroku_gnzk5747:4d2121nhgnfbdl1pfirsdepk9n@ds125262.mlab.com:25262/heroku_gnzk5747");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});