// Scrimba Momentum Dashboard Clone Project
const baseUrl = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';
const author = document.querySelector('#author');

async function getRandomBg() {
  try {
    const res = await fetch(`${baseUrl}`);
    const data = await res.json();
  
    const bgUrl = data.urls.regular; // update to full later
    const authorData = data.user.name;
    document.body.style.backgroundImage = `url(${bgUrl})`
    author.textContent = `By: ${authorData}`
  } catch(err) {
    alert('Something went wrong', err);
  }
}

async function getCryptoData() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/dogecoin`)
    const data = await res.json();
    // Display crypo data - split to its own function
    const cryptoSection = document.querySelector('#crypto');
    cryptoSection.innerHTML = `
      <div>
        <div class="crypto-header"><img src=${data.image.small}><h2>${data.name}</h2></div>
        <ul class="crypto-list">
          <li>🎯: <span>$${data.market_data.current_price.usd}</span></li>
          <li>⬆️: <span>$${data.market_data.high_24h.usd}</span></li>
          <li>⬇️: <span>$${data.market_data.low_24h.usd}</span></li>
        </ul>
      </div>
    `
  } catch(err) {
    alert('Something went wrong', err)
  }
}

// get/display current time
function updateTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString('en-us', {timeStyle: 'short'});
  document.querySelector('#time').textContent = currentTime;
}

// get/display weather info
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function displayWeather(weatherData) {
  const weather = document.querySelector('#weather');
  const icon = weatherData.weather[0]['icon'];
  weather.innerHTML = `
    <img class="weather-img" src=http://openweathermap.org/img/wn/${icon}@2x.png>
    <p class="weather-temp">${Math.round(weatherData.main.temp)}º</p>
    <p class="weather-city">${weatherData.name}</p>
    `;
  console.log(weatherData.main.temp)
  console.log(weatherData.name)
}

async function getWeather(position) {
  try {
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    const data = await res.json()
    console.log(data)
    displayWeather(data)
  } catch(err) {
    alert('Something went wrong', err)
  }

}

navigator.geolocation.getCurrentPosition(getWeather, error, options);

// add content to DOM:
getRandomBg(); // make this once a day?
getCryptoData();
setInterval(updateTime, 1000);
