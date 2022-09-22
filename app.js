// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=a49ee24d7cdf71460e885d9835cf482b&units=imperial';
/* Global Variables */
let URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

let d = new Date();

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

let localhost = 'http://localhost:3000'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', GetData);

/* Function called by event listener */
function GetData()
{
    const zip = document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;
   
    GetTemperature(URL,zip,apiKey).then((data)=>{
        const infoData = {
            temperature: data.main.temp,
            date: newDate,
            Feel: feeling
        };
         // Add data to POST request
         postData(localhost +'/AddingData', infoData);
         retrieveData();
    })
}

/* Function to GET Web API Data*/
const GetTemperature = async (URL,zip,apiKey) =>
{
  const response = await fetch(URL+zip+apiKey , 
    {
      method: 'GET', 
      credentials: 'same-origin', 
    })
  console.log(response);
  try {
    const data = await response.json();
    return data
  } catch (error) {
    console.log('error', error);
  }
  
};
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  });

    try {
      const newData = await response.json();
             return newData
    }catch(error) {
    console.log("Error!", error);
    }
}



/* Function to GET Project Data */

const retrieveData = async () =>{
    const request = await fetch(localhost+'/GetWeatherData');
    try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = 'Tempreture: ' + Math.round(allData.temperature)+ ' Degrees';
    document.getElementById('content').innerHTML = 'Feeling: '+ allData.Feel;
    document.getElementById('date').innerHTML ='Date: ' + allData.date;
    }
    catch(error) {
      console.log("Error!", error);
    }
   }




 