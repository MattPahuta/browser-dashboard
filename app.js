// Scrimba Momentum Dashboard Clone Project
const baseUrl = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';
const author = document.querySelector('#author');
// const weather = document.querySelector('#weather');

async function getRandomBg() {
  const res = await fetch(`${baseUrl}`);
  const data = await res.json();

  const bgUrl = data.urls.regular; // update to full later
  const authorData = data.user.name;
  document.body.style.backgroundImage = `url(${bgUrl})`
  author.textContent = `By: ${authorData}`
}


// get crypto data
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then(res => {
    if (!res.ok) {
      throw Error('Something went wrong');
    }
    return res.json();
  })
  .then(data => {
    // add build crypto list html function to replace this
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
  })
  .catch(err => console.error(err));

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

// function success(pos) {
//   const crd = pos.coords;
//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(success, error, options);

function displayWeather(weatherData) {
  const weather = document.querySelector('#weather');
  const icon = weatherData.weather[0]['icon'];
  weather.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`;
}

async function getWeather(position) {
  const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
  const data = await res.json()
  displayWeather(data)
}

navigator.geolocation.getCurrentPosition(getWeather, error, options);

// navigator.geolocation.getCurrentPosition(position => {
//   fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
//     .then(res => {
//       if (!res.ok) {
//         throw Error('Weather data not available');
//       }
//       return res.json();
//     })
//     .then(data => {
//       console.log(data.weather[0]['icon'])
//       const icon = data.weather[0]['icon'];
//       weather.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`;

//     })
//     .catch(err => console.error(err));
//   });

// add content to DOM:
getRandomBg(); // make this once a day?
setInterval(updateTime, 1000);
