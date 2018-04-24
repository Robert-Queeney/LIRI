require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require('node-spotify-api'); 
const Twitter = require('twitter'); 

let request = require("request"); 
let fs = require("fs"); 

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);


let action = process.argv[2];

console.log(keys.spotify); 
console.log(action); 

// functions depending on the input
// twitter
function twitter(){

client.get('statuses/user_timeline', {count: 10}, function(error, tweets, response) {
    if (!error) {
      tweets.forEach((results) => { 
        //   need to console log text and the date time (figure out that element)
        console.log(results.text)
        console.log(results.created_at)
      })
      //console.log("these are my tweets", tweets);
    }
})

}


// spotify function
function music(songName){

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data.tracks.items); 
    })
}; 

// omdb function

function movie(movieName) {
    request(`http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            let movieData = {
                "Title of the movie: ": JSON.parse(body).Title,
                "Year the movie came out: ": JSON.parse(body).Year, 
                "IMDB rating of this movie: ": JSON.parse(body).imdbRating, 
                "Rotten tomatoes rating of thie movie :": JSON.parse(body).Ratings[2], 
                "Country where the movie was produced :": JSON.parse(body).Country, 
                "Language of the movie: ": JSON.parse(body).Language, 
                "Plot of the movie: ": JSON.parse(body).Plot, 
                "Actors in the movie: ": JSON.parse(body).Actors
            }

            console.log(movieData);
        }

    });
}



// bonus
// fs.appendFile will work to move data to the .txt file

// need to run different functions based off of argv
switch (action) {
    case "my-tweets": 
        twitter(); 
        break; 
    
    case "spotify-this-song":
        music(process.argv[3]); 
        break; 
    
    case "movie-this":
        movie(process.argv[3]); 
        break; 
    
    case "do-what-it-says":
        says(); 
        break; 
    }