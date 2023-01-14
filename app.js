// Scrimba Momentum Dashboard Clone Project
const baseUrl = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';
const author = document.querySelector('#author');

async function getRandomBg() {
  const res = await fetch(`${baseUrl}`);
  const data = await res.json();

  const bgUrl = data.urls.regular; // update to full later
  const authorData = data.user.name;
  document.body.style.backgroundImage = `url(${bgUrl})`
  author.textContent = `By: ${authorData}`
}

getRandomBg()

// get bitcoin data
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