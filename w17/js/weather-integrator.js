import { getUserLocation, fetchWeatherData } from "./weather-data-service.js";

const weatherDisplaySection = document.getElementById('weather-display');
const weatherLocationSpan = document.getElementById('weatherLocation');
const currentWeatherValueSpan = document.getElementById('currentWeatherValue');
const weatherStatusMessage = document.getElementById('weatherStatusMessage');
const weatherDateSpan = document.getElementById('weatherDate');

let currentWeatherRisk = { risk: 'low' }; // Default to low risk

const getWeatherRisk = (code, rainChance) => {
    // 51-67 are Drizzle/Rain (Moderate to Heavy)
    if (code >= 51 && code <= 67) {
        return {
            status: "High Risk: Rain expected! Adjust your budget for gear protection.",
            risk: "high",
            displayValue: `☔ HIGH (${rainChance}%)`
        };
    }
    // 80-82 are Rain Showers
    if (code >= 80 && code <= 82 || rainChance > 40) {
        return {
            status: "Medium Risk: Showers possible. Consider budget for light covers.",
            risk: "medium",
            displayValue: `🌦️ MEDIUM (${rainChance}%)`
        };
    }
    // 0-3 are Clear to Cloudy
    if (code >= 0 && code <= 3) {
        return {
            status: "Low Risk: Clear conditions expected.",
            risk: "low",
            displayValue: `☀️ LOW (${rainChance}%)`
        };
    }
    // Default catch-all
    return {
        status: "Weather conditions are stable. Low risk.",
        risk: "low",
        displayValue: `☁️ LOW (${rainChance}%)`
    };
};

const renderWeatherDisplay = (weatherData) => {
    const { currentWeatherCode, maxRainChance, timezone } = weatherData;
    const { status, risk, displayValue } = getWeatherRisk(currentWeatherCode, maxRainChance);

    currentWeatherValueSpan.textContent = displayValue;
    weatherStatusMessage.textContent = status;
    
    weatherStatusMessage.style.color = risk === 'high' ? 'red' : risk === 'medium' ? 'orange' : 'green';
    
    weatherDateSpan.textContent = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
};

export const getCurrentWeatherRisk = () => currentWeatherRisk;

export const loadAndDisplayWeather = async () => {
    console.log('Initializing Weather Integration...');
    currentWeatherValueSpan.textContent = '...';
    weatherStatusMessage.textContent = "Locating your busking spot...";
    weatherLocationSpan.textContent = '...';
    weatherDateSpan.textContent = new Date().toLocaleTimeString();
    weatherDisplaySection.style.display = 'block';

    try {
        const { latitude, longitude } = await getUserLocation();
        weatherStatusMessage.textContent = "Location found. Ready for forecast.";
        weatherStatusMessage.style.color = 'blue';
        weatherLocationSpan.textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
        
        const weatherData = await fetchWeatherData(latitude, longitude);
        renderWeatherDisplay(weatherData);
        
        currentWeatherRisk = getWeatherRisk(weatherData.currentWeatherCode, weatherData.maxRainChance);

    } catch (error) {
        currentWeatherValueSpan.textContent = '--';
        weatherLocationSpan.textContent = 'N/A';
        weatherDateSpan.textContent = new Date().toLocaleTimeString();
        weatherStatusMessage.style.color = 'red';
        weatherStatusMessage.textContent = `${error.message}`;
        weatherDisplaySection.style.display = 'block';
        currentWeatherRisk = { risk: 'low' };
    }
};