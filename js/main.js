const inputBox = document.querySelector('.input-box'),
     searchBtn = document.getElementById('searchBtn'),
     welcome = document.querySelector('.welcome'),
     weather_app =document.getElementById('weather-app'),
     lca = document.querySelector('.location'),
     weather__img = document.querySelector('.weather-img'),
     temperature = document.querySelector('.temperature'),
     description = document.querySelector('.description'),
     humidity = document.getElementById('humidity'),
     wind_speed = document.getElementById('wind-speed'),
     pressure = document.getElementById('pressure'),
     feels_like = document.getElementById('feels-like'),
     not_found = document.querySelector('.not_found'),
     weather__body = document.querySelector('.weather__body')
;     


async function checkWeather(city) {
    const API_KEY = "765cbe5a27298a73c7d09f7ca81bed4b";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const weather__data = await fetch(`${URL}`).then(response => response.json());

    
    if(weather__data.cod === `404`){
        not_found.style.display = "flex";
        weather__body.style.display = "none";
        welcome.style.display = "none";
        console.log("error");
        return;
    }  
    
    not_found.style.display = "none";
    weather__body.style.display = "flex";
    welcome.style.display = "none";

    lca.innerHTML = `${weather__data.name}`; 
    temperature.innerHTML = `${Math.round(weather__data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather__data.weather[0].description}`;

    humidity.innerHTML = `${weather__data.main.humidity}%`;
    wind_speed.innerHTML = `${weather__data.wind.speed}km/h`;
    pressure.innerHTML = `${weather__data.main.pressure}hpa`;
    feels_like.innerHTML = `${Math.round(weather__data.main.feels_like -  273.15)}°C`;


    if(weather__data.weather[0].main === 'Clouds'){
        weather__img.src = '../images/cloud.png';
        weather_app.style.backgroundImage = "url(../images/night~cloud.jpg)";
    }
    else if(weather__data.weather[0].main === 'Clear'){
        weather__img.src = '../images/clear.png';
        weather_app.style.backgroundImage = "url(../images/day~clear.jpg)";
    }
    else if(weather__data.weather[0].main === 'Rain'){
        weather__img.src = '../images/rain.png';
        weather_app.style.backgroundImage = "url(../images/night~rainy.jpg)";
    }
    else if(weather__data.weather[0].main === 'Mist'){
        weather__img.src = '../images/mist.png';
        weather_app.style.backgroundImage = "url(../images/mist.jpg)";
    }
    else if(weather__data.weather[0].main === 'Snow'){
        weather__img.src = '../images/snow.png';
        weather_app.style.backgroundImage = "url(../images/snow.jpg)";
    }


   /* console.log(weather__data);*/
}



searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value)
})