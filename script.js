const inputBox = document.querySelector('.input-box');      // Access the Elements
const searchBtn = document.getElementById('search-btn')
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('Humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather (city){             // create a async function for API
    const api_key = "7941af57a0e10e41d6b556639b9707ff";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data =await fetch(`${url}`).then(response => response.json());        //fetch the data from API

    if(weather_data.cod === '404') {        //if there is no such city show location not found image
        
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        return;
    }

    location_not_found.style.display="none";
    weather_body.style.display="flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)} °C`;      //Access the innerHTML
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;

    switch(weather_data.weather[0].main) {          //add images as per the data
        case 'Clouds':
            weather_img.src = '/images/cloud.png';
            break;
        case 'Clear':
                weather_img.src = '/images/clear.png';
                break;
        case 'Rain':
            weather_img.src = '/images/rain.png';
            break;
        case 'Mist':
            weather_img.src = '/images/mist.png';
            break;
        case 'Snow':
            weather_img.src = '/images/snow.png';
            break;
    }
}

searchBtn.addEventListener('click',()=>{        //add event listener on the search button
    checkWeather(inputBox.value);
});