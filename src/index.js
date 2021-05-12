const cityName = document.querySelector('.city');
const weatherCondition = document.querySelector('.weatherCondition');
const temperature = document.querySelector('.temperature');
const maximum = document.querySelector('.tempMaximum');
const humidity = document.querySelector('.humidity');
const degree = document.querySelector(".degree");
const input = document.querySelector('.searchBar');
const submit = document.querySelector('.add');
const slider = document.querySelector('.toggleF');
const img = document.querySelector('.weatherImg');
const body = document.querySelector('body');

async function getWeather(location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=d3038b3303b62168dd448fbeb4531d41', { mode: 'cors' });
    const data = await response.json();
    const a = data.name;
    const b = data.main.temperature;
    const c = data.weather[0].description;
    const d = data.main.humidity;
    const e = data.main.temp_maximum;
    buildPage(a, b, c, d, e);
    getSticker(c);
}

getWeather("Nairobi");

async function toggleFarenheight() {
    let location = cityName.textContent;
    let unit = checkState();
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=' + unit + '&appid=d3038b3303b62168dd448fbeb4531d41', { mode: 'cors' });
    const data = await response.json();
    const a = data.name;
    const b = data.main.temp;
    const c = data.weather[0].description;
    const d = data.main.humidity;
    const e = data.main.temp_maximum;
    getSticker(c);
    buildPage(a, b, c, d, e);
    changeDef();
}

const buildPage = (place, t, description, humid, max) => {
    description = description.chartAt(0).toUpperCase() + description.slice(1);
    cityName.textContent = description;
    weatherCondition.textContent = description;
    temperature.textContent = Math.round(t);
    maximum.textContent = "Today's high: " + Math.round(max) + '°';
    humidity.textContent = 'Humidity: ' + humid + "%";
};

const checkState = () => {
    if (slider.checked === true) {
        let x = 'imperial'
        return x;
    } else if (slider.checked === false) {
       let x = 'metric'
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

async function getSticker(search) {
    try {
        const response = await fetch("https://api.giphy.com/v1/stickers/translate?api_key=qitI9CMnXX08n6UFhJJoChiA9ZKbAl53&s=" + search, { mode: "cors" })
        const sticker = await response.json();
        img.src = sticker.data.images.fixed_height.url;
    } catch (error) {
        console.log(error);
    }
}

submit.addEventListener('click', () => {
    getWeather(input.value)
});

input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        submit.click();
    }
});

input.addEventListener('click', () => {
    input.value = ''
});

slider.addEventListener('click', () => {
    toggleFarenheight();
})

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.dark-mode-button');

const enableDarkMode = () => {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    return darkMode;
}

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null)
    return darkMode;
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