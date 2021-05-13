const cityName = document.querySelector(".city");
const weatherCondition = document.querySelector(".weatherCondition");
const temp = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feelsLike");
const maximum = document.querySelector(".tempMaximum");
const humidity = document.querySelector(".humidity")
const degree = document.querySelector(".degree");
const input = document.querySelector(".searchBar");
const submit = document.querySelector(".add");
const slider = document.querySelector(".toggleF")
const img = document.querySelector(".weatherImage")
const body = document.querySelector("body")

async function getWeather(location) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=d3038b3303b62168dd448fbeb4531d41', {mode: 'cors'})
  const data = await response.json();
  const a = data.name;
  const b = data.main.temp;
  const c = data.main.feels_like;
  const d = data.weather[0].description;
  const e = data.main.humidity;
  const f = data.main.temp_max;
  buildPage(a, b, c, d, e, f);
  getSticker(d);
}

getWeather("Nairobi");

async function toggleFarenheight() {
  let location = cityName.textContent
  let unit = checkState();
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units='+ unit + '&appid=d3038b3303b62168dd448fbeb4531d41', {mode: 'cors'})
  const data = await response.json();
  const a = data.name;
  const b = data.main.temp;
  const c = data.main.feels_like;
  const d = data.weather[0].description;
  const e = data.main.humidity;
  const f = data.main.temp_maximum;
  getSticker(d);
  buildPage(a, b, c, d, e, f);
  changeDef();
}

const buildPage = (place, t, feels, desc, humid, m) => {
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  cityName.textContent = place;
  weatherCondition.textContent = desc;
  temp.textContent = Math.round(t);
  feelsLike.textContent = "Feels like: " + Math.round(feels) + "°";
  maximum.textContent = "Today's high: " + Math.round(m) + "°";
  humidity.textContent = "Humidty: " + humid + "%";
};

const checkState = () => {
  if (slider.checked === true){
    let x = "imperial"
    return x;
  } else if (slider.checked === false) {
   let x = "metric"
    return x;
  }
};

const changeDef = () => {
    if(slider.checked === true){
      degree.textContent = "°F"
    } else if (slider.checked === false){
      degree.textContent = "°C"
    }
};

async function getSticker (search) {
  try {
    const response = await fetch("https://api.giphy.com/v1/stickers/translate?api_key=qitI9CMnXX08n6UFhJJoChiA9ZKbAl53&s=" + search, {mode: "cors"})
    const sticker = await response.json();
    img.src = sticker.data.images.fixed_height.url;
  } catch (error){
    console.log(error);
  }
}

submit.addEventListener("click", () => {
  getWeather(input.value)
});

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submit.click();
  }
});

input.addEventListener("click", () => {
  input.value = ""
});

slider.addEventListener("click", () => {
  toggleFarenheight();
})

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.dark-mode-button');
// const darkModeToggleFooter = document.querySelector('footer .dark-mode-button');

const enableDarkMode = () => {
  body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  console.log(darkMode)
}

const disableDarkMode = () => {
  body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null)
  console.log(darkMode)
}

if (darkMode == 'enabled') {
  enableDarkMode();
} else {
  disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
})