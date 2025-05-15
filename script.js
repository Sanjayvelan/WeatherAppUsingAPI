const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('search_btn');

const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const cel = document.getElementById('celsius');
const desc = document.querySelector('.description');

const hum = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
 
const not_found = document.querySelector('.not-found');
const weatherBody = document.querySelector('.weather_body');

inputBox.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });

async function getWeather(city){
    const api_key = "a203700d02eeffca759229475e8597ec";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    
    if(weather_data.cod=='404'){
        not_found.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return
    }
    
    console.log(weather_data);
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    desc.innerHTML = `${weather_data.weather[0].description}`;
    hum.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${Math.round(weather_data.wind.speed / 0.621371192)}Km/H`;

    switch(weather_data.weather[0].main || weather_data.weather[1].main){
        case 'Clouds':
            weatherImg.src = "cloud.png";
            break;
        case 'Rain':
            weatherImg.src = "rain.png";
            break;
        case 'Mist':
            weatherImg.src = "mist.png";
            break;
        case 'Snow':
            weatherImg.src = "snow.png";
            break;    
        case 'Clear':
            weatherImg.src = "clear.png";
            break;    
    }
    not_found.style.display = "none";
    weatherBody.style.display = "flex";
}


