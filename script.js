const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "edf5952e910fb88015562802e507089c"; // Add your OpenWeatherMap API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = 'flex';
            weather_body.style.display = 'none';
            weather_img.src = "/images/error.png"; // Display error icon
            console.error('Location not found');
            return;
        }
        console.log('Success');
        location_not_found.style.display = 'none';
        weather_body.style.display = 'none'; // Hide the weather body initially

        // Add a delay before displaying the new temperature
        setTimeout(() => {
            weather_body.style.display = 'flex';
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
        }, 1000); // 0.8 seconds delay

        // Add the background change logic based on weather conditions
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                setWeatherBackground('weather-cloudy');
                break;
            case 'Clear':
                setWeatherBackground('weather-clear');
                break;
            case 'Rain':
                setWeatherBackground('weather-rainy');
                break;
            case 'Mist':
                // Handle Mist condition
                setWeatherBackground('weather-mist'); // Add mist class
                break;
            case 'Snow':
                // Handle Snow condition
                setWeatherBackground('weather-snow'); // Add snow class
                break;
            default:
                setWeatherBackground('weather-default');
        }

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/images/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/images/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/images/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/images/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/images/snow.png";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error('Error fetching weather data', error);
    }
}
function setWeatherBackground(className) {
    // Remove existing weather classes from body
    document.body.classList.remove('weather-cloudy', 'weather-clear', 'weather-rainy', 'weather-mist', 'weather-snow', 'weather-default');
    // Add the appropriate weather class
    document.body.classList.add(className);
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
