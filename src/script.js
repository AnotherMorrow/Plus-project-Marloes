function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dateNumber = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${dateNumber} ${month} ${year}, ${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let apiKey = "bf635ee358fd7c6cf46cfa9caadaea03";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let humidityDegree = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let cityName = response.data.name;

  let h2 = document.querySelector("h2");
  h2.innerHTML = `The weather in ${cityName}`;

  let heading = document.querySelector(".temp-day");
  heading.innerHTML = temperature;

  let detailOne = document.querySelector("#detail-one");
  detailOne.innerHTML =
    weatherDescription[0].toUpperCase() + weatherDescription.substring(1);

  let detailTwo = document.querySelector("#detail-two");
  detailTwo.innerHTML = `Humidity: ${humidityDegree}%`;

  let detailThree = document.querySelector("#detail-three");
  detailThree.innerHTML = `Wind: ${windSpeed} km/h`;
}

let dateElement = document.querySelector(".date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", searchCity);
