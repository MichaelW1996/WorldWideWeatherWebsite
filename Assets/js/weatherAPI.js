let cityinput = document.getElementById("cityinput");
let inputbutton = document.getElementById("search");
var cardholder = document.getElementById("daycontainer");
let searchCity; //variable for parsed user input - in format for search in lowercase
let historyCity; //variable for user input - in format for search history - in Titlecase

let APIkey = "2ae4997dd0cb7de82a061647d700fe95";

var now = dayjs();

let days = function (offset) {
  //function to offset days for 5 day forcast days(0) returns today, day(1) returns tomorrow, completely unneeded

  return now.add(offset, "day").format("DD-MM-YYYY");
};
function mapWeatherData(obj) {
  parsedWeather = {};
  parsedWeather.date = obj.date;
  parsedWeather.icon = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`; //the url needed for the icon
  parsedWeather.temp = obj.main.temp;
  parsedWeather.wind = obj.wind.speed;
  parsedWeather.humid = obj.main.humidity;
  return parsedWeather;
}

function writeCard(obj) {
  var card = document.createElement("card");

  var date = document.createElement("p");
  date.textContent = obj.date;
  var icon = document.createElement("img");
  icon.src = obj.icon;
  var temp = document.createElement("p");
  temp.textContent = `Temp: ${obj.temp} C`;
  var wind = document.createElement("p");
  wind.textContent = `Wind: ${obj.wind} MPH`;
  var humid = document.createElement("p");
  humid.textContent = `Humidity ${obj.humid}%`;
  card.appendChild(date);
  card.appendChild(icon);
  card.appendChild(temp);
  card.appendChild(wind);
  card.appendChild(humid);
  cardholder.append(card);
}

function getWeather(city) {
  //search for data
  let request =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=metric";
  fetch(request).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let weather = data.list; //this has weather for every 3 hrs
        weather = weather.filter((_, index) => index % 8 === 0); //makes it one per 24 hrs
        weather = weather.map((object) => {
          const date = dayjs.unix(object.dt).format("DD-MMM HH:mm");
          //adds nicely formatted date key value pair
          return { ...object, date };
        });
        cardholder.innerHTML = ""; //empties the container completely
        for (let index = 0; index < 5; index++) {
          const element = weather[index]; //gets just one of the objects (one days weather info)
          writeCard(mapWeatherData(element)); //makes a new object parsedWeather with easier paths to keys and only the keys we need
          //now have object with just the needed info
          //write code to create elements here
        }
      });
    }
  });
}

function search() {
  searchCity = cityinput.value.trim().toLowerCase(); //puts input to lowercase for fetch
  historyCity = searchCity.charAt(0).toUpperCase() + searchCity.substr(1); //puts input to Titlecase for search history (personal choice)
  getWeather(searchCity);
}

inputbutton.addEventListener("submit", (event) => {
  event.preventDefault();
  search();
});
