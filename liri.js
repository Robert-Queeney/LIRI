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

// need to run different functions based off of argv
switch (action) {
    case "my-tweets": 
        twitter(); 
        break; 
    
    case "spotify-this-song":
        music(); 
        break; 
    
    case "movie-this":
        movie(); 
        break; 
    
    case "do-what-it-says":
        says(); 
        break; 
    }



// functions depending on the input
// twitter
function twitter(){

client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
    if (!error) {
      console.log("these are my tweets", tweets);
    }
})

}
// spotify function
function music(){

spotify.search({ type: 'track', query: action }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data); 
    })
}; 

// omdb function

function movie()
request(`http://www.omdbapi.com/?t=${argv[4]}y=&plot=short&apikey=trilogy`, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(response);
  }
});

// i dont understand the 4th part of this assignment, and I dont have enough time to get a response from anyone
// my code before this doesnt fully work