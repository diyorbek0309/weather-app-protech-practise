let selected_index = 0;
let selected_city = document.getElementsByClassName("selected_city")[0];
let cities = document.querySelectorAll(".city li");
const current = document.getElementById("current");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const hPa = 0.750062;

const API_KEY = "5fced8cbe8dc41c5834a87f5e5464752";
let currentWeather = {};

async function getTashkent() {
  currentWeather = await sendRequest("Tashkent");
  if (currentWeather) {
    current.textContent = `Hozirgi harorat: ${Math.round(
      currentWeather.main.temp - 273
    )}°`;
    humidity.textContent = `Namlik: ${currentWeather.main.humidity}%`;
    wind.textContent = `Shamol: ${Math.round(currentWeather.wind.speed)} m/s`;
    pressure.textContent = `Bosim: ${Math.round(
      currentWeather.main.pressure * hPa
    )}mm sim. ust.`;
    const sunriseHour = new Date(currentWeather.sys.sunrise).getHours() - 5;
    const sunriseMinute = new Date(currentWeather.sys.sunrise).getMinutes();
    sunrise.textContent = `Quyosh chiqishi: ${
      sunriseHour > 10 ? sunriseHour : "0" + sunriseHour
    }:${sunriseMinute > 10 ? sunriseMinute : "0" + sunriseMinute}`;
  }
}

getTashkent();

async function showWeather(city, index) {
  cities[index].classList.add("active");
  if (index !== selected_index)
    cities[selected_index].classList.remove("active");

  selected_index = index;

  switch (city) {
    case "Tashkent":
      selected_city.textContent = "Toshkent";
      break;
    case "Urgench":
      selected_city.textContent = "Urganch";
      break;
    case "Bukhara":
      selected_city.textContent = "Buxoro";
      break;
    case "Samarkand":
      selected_city.textContent = "Samarqand";
      break;
    default:
      selected_city.textContent = "Toshkent";
      break;
  }

  currentWeather = await sendRequest(city);

  current.textContent = `Hozirgi harorat: ${Math.round(
    currentWeather.main.temp - 273
  )}°`;
  humidity.textContent = `Namlik: ${currentWeather.main.humidity}%`;
  wind.textContent = `Shamol: ${Math.round(currentWeather.wind.speed)} m/s`;
  pressure.textContent = `Bosim: ${Math.round(
    currentWeather.main.pressure * hPa
  )}mm sim. ust.`;
  const sunriseHour = new Date(currentWeather.sys.sunrise).getHours() - 5;
  const sunriseMinute = new Date(currentWeather.sys.sunrise).getMinutes();
  sunrise.textContent = `Quyosh chiqishi: ${
    sunriseHour > 10 ? sunriseHour : "0" + sunriseHour
  }:${sunriseMinute > 10 ? sunriseMinute : "0" + sunriseMinute}`;
  // const sunsetHour = new Date(currentWeather.sys.sunset).getHours();
  // const sunsetMinute = new Date(currentWeather.sys.sunset).getMinutes();
  // sunset.textContent = `Quyosh botishi: ${
  //   sunsetHour > 10 ? sunsetHour : "0" + sunsetHour
  // }:${sunsetMinute > 10 ? sunsetMinute : "0" + sunsetMinute}`;
  // console.log(new Date(currentWeather.sys.sunset).getHours());
}

async function sendRequest(city) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );

  const result = await data.json();
  return result;
}

