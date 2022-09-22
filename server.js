// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
// parsing the incoming POST request bodies in a middleware.
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

//Spin up the server
const server = app.listen(port, listening);
 function listening(){
    console.log(`The Server is running on localhost: ${port}`);
  };


// GET /GetWeatherData' route
app.get('/GetWeatherData', sendData);
//function to complete GET '/all'
function sendData (req, res) {
    res.send(projectData);
  };

// POST the route
app.post('/AddingData', callBack);

//function to complete POST '/AddingData'
function callBack(req,res){
    projectData.temperature = req.body.temperature;
    projectData.date= req.body.date;
    projectData.Feel = req.body.Feel;
    res.end();
  }

