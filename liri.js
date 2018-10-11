// require(".env").config();

// // Include the request npm packages (Don't forget to run "npm install request" in this folder first!)
var moment = require('moment');
var request = require("request");
var keys = require("./keys.js");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the name the user puts in
var anyName = "";


// Loop through all the words in the node argument starting at 3
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {



        anyName = anyName + "+" + nodeArgs[i];

    }

    else {

        anyName += nodeArgs[i];

    }
}

if (!anyName) {
    anyName = 'mr nobody'
}

var commandName = process.argv[2];

console.log(commandName);

if (commandName === 'movie-this') {
    movieThis();
} 
else if (commandName === 'spotify-this') {
    spotifyThis();
}
else if (commandName === 'concert-this') {
    concertThis();
}
else if (commandName === 'do-what-it-says') {
    doWhat();
}
function concertThis() {
    console.log('do concert stuff');
}

function movieThis() {
    console.log('do movie stuff');
}

function spotifyThis() {
    console.log('spotify some song');
}
function doWhat() {
    console.log('do-what-it-says');
}



function movieThis() {
    // run a request to the OMDB API with the movie specified
    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy";
    var omdbUrl = keys.omdbKey.provider + anyName + keys.omdbKey.apiKey

    // This line is just to help us debug against the actual URL.
    console.log(omdbUrl);

    request(omdbUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover the 
            // Title of the movie, 
            // Year the movie came out 
            // IMDB Rating of the movie
            //  Rotten Tomatoes Rating of the movie
            //  Country where the movie was produced
            //  Language of the movie
            // Plot of the movie 
            //  Actors in the movie.
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Ratings);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Actors);

        }
    });
}



function spotifyThis() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: keys.spotifyKey.myId,
        secret: keys.spotifyKey.secretId
    });

    spotify.search({ type: 'track', query: anyName, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(JSON.stringify(data, null, 2));
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
        

    });
}




function concertThis() {
    var bandsintown = require('bandsintown')("codingbootcamp");

    bandsintown
        .getArtistEventList(anyName)
        .then(function (events) {
            // return array of events
            // console.log(JSON.stringify(events, null, 2));
            console.log(events[0].venue.name);
            console.log(events[0].venue.city + ", " + events[0].venue.country);
            console.log(moment(events[0].datetime).format('MM/DD/YYYY'));
        });
}




// Includes the FS package for reading and writing packages
function doWhat (){
    var fs = require("fs");

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // We will then print the contents of data
  console.log(data);

//   // Then split it by commas (to make it more readable)
//   var dataArr = data.split(",");

//   // We will then re-display the content as an array for later use.
//   console.log(dataArr);
});

}
