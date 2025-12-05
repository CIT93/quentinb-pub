export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error) => {
            console.log(error);
            let errorMessage;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Permission denied. Please enable location services.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Getting your location timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred while getting location.";
                    break;
            }
            reject(new Error(errorMessage));
        });
    });
};

export const fetchWeatherData = async (lat, lon) => {
    console.log(`Fetching weather for ${lat}, ${lon}...`);

    const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1/forecast";

    const url = `${WEATHER_API_BASE_URL}?latitude=${lat}&longitude=${lon}&hourly=precipitation_probability&current=weather_code&forecast_days=1&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const hourlyProbabilities = data.hourly.precipitation_probability || [];
        const maxRainChance = hourlyProbabilities.length > 0 ? Math.max(...hourlyProbabilities) : 0;
        const currentWeatherCode = data.current.weather_code;
        
        return {
            currentWeatherCode: currentWeatherCode,
            maxRainChance: maxRainChance,
            timezone: data.timezone,
            location: `${lat.toFixed(2)}, ${lon.toFixed(2)}`
        };

    } catch (error) {
        console.error("Error fetching weather data.", error);
        throw new Error(`Could not fetch weather data: ${error.message}`);
    }
};