let cityinput = document.getElementById("cityinput"); //Form the user entered data into
let inputbutton = document.getElementById("search"); //Sumbit button on form
var cardholder = document.getElementById("daycontainer"); //the container for each day in 5 day forecast
var searchitems = document.getElementById("history"); //container for search history
var today = document.getElementById("today"); //the container for todays info
var searches = JSON.parse(localStorage.getItem("searchItems")) || []; //get the search items from local storage
let searchCity; //variable for parsed user input - in format for search in lowercase
let historyCity; //variable for user input - in format for search history - in Titlecase

let APIkey = "2ae4997dd0cb7de82a061647d700fe95";

function searchHistory(newterm) {
  //function to update and display search history
  if (!searches.includes(newterm) && newterm) {
    //if old searches doesnt include the new search term also make sure there is a new term
    searches.push(newterm); //push the new term onto the search array
  }
  if (searches.length > 5) {
    //if the history reaches is over 5, get rid of the first one (oldest)
    searches.shift();
  }
  searchitems.innerHTML = ""; //wipe the search history
  for (let index = searches.length - 1; index >= 0; index--) {
    //runs a for loop, but starts at the last object and runs backwards so the most recent search is at the top
    var prevSearch = document.createElement("li"); //make a list item
    prevSearch.textContent = searches[index]; //writes the search history item into the list item
    searchitems.appendChild(prevSearch); //attach to the search history
  }

  localStorage.setItem("searchItems", JSON.stringify(searches)); //store the search history
}

function mapWeatherData(obj) {
  //take in the response object
  parsedWeather = {}; //make a new object
  parsedWeather.date = obj.date; //only parse in the data we want
  parsedWeather.icon = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`; //the url needed for the icon
  parsedWeather.temp = obj.main.temp; //simplifies longer paths to keys like these
  parsedWeather.wind = obj.wind.speed;
  parsedWeather.humid = obj.main.humidity;
  return parsedWeather; //returns the new object
}

function writeToday(City, obj) {
  //display the data for the today section
  today.innerHTML = ""; //clear the section to remove the last search information

  var cityAndDate = document.createElement("p"); //create a new text element (repeat for all items)
  cityAndDate.textContent = `${City} ${obj.date}`; //inputs data from the supplied object (repeat for all items)
  var icon = document.createElement("img");
  icon.src = obj.icon; //source for the image is already parsed to a url by the mapWeatherData function
  var temp = document.createElement("p");
  temp.textContent = `Temp: ${obj.temp} C`;
  var wind = document.createElement("p");
  wind.textContent = `Wind: ${obj.wind} MPH`;
  var humid = document.createElement("p");
  humid.textContent = `Humidity ${obj.humid}%`;
  if (obj.humid < 30) {
    //apply a class if humidity is within certain bounds
    humid.className = "dry";
  } else if (obj.humid < 60) {
    humid.className = "moderate";
  } else {
    humid.className = "humid";
  }
  today.appendChild(cityAndDate); //append all the information to the today element
  today.appendChild(icon);
  today.appendChild(temp);
  today.appendChild(wind);
  today.appendChild(humid);
}

function writeCard(obj) {
  //function to write one card for 1 days forecast
  var card = document.createElement("card"); //make a card

  var date = document.createElement("p"); //make text element for each parameter of the forecast
  date.textContent = obj.date; //pass in the data
  var icon = document.createElement("img");
  icon.src = obj.icon;
  var temp = document.createElement("p");
  temp.textContent = `Temp: ${obj.temp} C`;
  var wind = document.createElement("p");
  wind.textContent = `Wind: ${obj.wind} MPH`;
  var humid = document.createElement("p");
  humid.textContent = `Humidity ${obj.humid}%`;
  card.appendChild(date); //append all the elements to the card (one day forecast)
  card.appendChild(icon);
  card.appendChild(temp);
  card.appendChild(wind);
  card.appendChild(humid);
  cardholder.append(card); //append the card into the card holder (which will hold the full 5 cards for a 5 day forecast)
}

function getWeather(city) {
  //search for data
  let request =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=metric"; //creates the request using data provided by user
  fetch(request).then(function (response) {
    //makes the request and awaits a response
    if (response.ok) {
      //if the response was valid
      response.json().then(function (data) {
        let weather = data.list; //this has weather for every 3 hrs
        weather = weather.filter((_, index) => index % 8 === 0); //makes it one per 24 hrs
        weather = weather.map((object) => {
          const date = dayjs.unix(object.dt).format("DD-MMM HH:mm");
          //adds nicely formatted date key value pair
          return { ...object, date };
        });
        writeToday(city, mapWeatherData(weather[0])); //calls the writeToday function to display todays weather - first item in the weather array
        cardholder.innerHTML = ""; //empties the 5 day forecast container completely
        for (let index = 0; index < 5; index++) {
          const element = weather[index]; //gets just one of the objects (one days weather info)
          writeCard(mapWeatherData(element)); //makes a new object parsedWeather with easier paths to keys and only the keys we need
        }
      });

      historyCity = searchCity.charAt(0).toUpperCase() + searchCity.substr(1); //puts input to Titlecase for search history (personal choice)
      searchHistory(historyCity); //calls the searchHistory function to put data into the search history
    } else {
      alert("City not found"); //tell the user if we didnt get a positive response
    }
  });
}

inputbutton.addEventListener("submit", (event) => {
  //if the search button is clicked
  event.preventDefault(); //dont reset
  searchCity = cityinput.value.trim().toLowerCase(); //puts input to lowercase for fetch
  getWeather(searchCity); //starts function to get data
});

searchitems.addEventListener("click", (event) => {
  //if a search item is clicked
  if (event.target.tagName == "LI") {
    //check that it was a list item
    var cityinput = event.target.innerHTML; //get the contents of the clicked list item
    searchCity = cityinput.value.trim().toLowerCase(); //puts input to lowercase for fetch
    getWeather(searchCity); //starts function to get data
  }
});

searchHistory(); //loads the search history on startup
