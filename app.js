// Scrimba Momentum Dashboard Clone Project
const baseUrl = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';

async function getRandomBg() {
  const res = await fetch(`${baseUrl}`);
  const data = await res.json();

  const bgUrl = data.urls.full;
  document.body.style.backgroundImage = `url(${bgUrl})`
}

getRandomBg()