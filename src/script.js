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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "bf635ee358fd7c6cf46cfa9caadaea03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  searchCity(searchInput.value);
}

function getForecast(coordinates) {
  let apiKey = "bf635ee358fd7c6cf46cfa9caadaea03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
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

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", weatherDescription);

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
      <div class="col-3 weather-forecast-date">${formatDay(
        forecastDay.dt
      )}</div>
              <div class="col-3">
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" />
              </div>
              <div class="col-6 weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}ºC</span
                ><span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}ºC</span>
              </div>
              </div>
            `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector(".date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");
