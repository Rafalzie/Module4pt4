// src/Weather.js
import { useState, useEffect } from 'react';
import { getLocationKey, getWeatherForecast, getCurrentConditions } from './WeatherService';

const Weather = () => {
    const [city, setCity] = useState('Reykjavik'); // Default city
    const [forecast, setForecast] = useState([]);
    const [currentConditions, setCurrentConditions] = useState(null);
    const [error, setError] = useState(null);

    // Function to handle city change
    const handleCityChange = (e) => setCity(e.target.value);

    // Function to fetch both the forecast and current weather data
    const fetchWeatherData = async () => {
        setError(null); // Clear previous error
        try {
            const locationKey = await getLocationKey(city);
            const forecastData = await getWeatherForecast(locationKey);
            const currentConditionsData = await getCurrentConditions(locationKey);

            setForecast(forecastData);
            setCurrentConditions(currentConditionsData);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Unable to fetch weather data.');
        }
    };

    // Fetch weather data when the component mounts or when the city changes
    useEffect(() => {
        fetchWeatherData();
    }, [city]); // Depend on 'city' to refetch data when city changes

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Weather Forecast</h2>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name"
            />
            <button onClick={fetchWeatherData}>Get Forecast</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display current weather conditions */}
            {currentConditions && (
                <div style={{ margin: '20px 0' }}>
                    <h3>Current Conditions for {city}</h3>
                    <p>{currentConditions.WeatherText}</p>
                    <p>Temperature: {currentConditions.Temperature.Metric.Value}°{currentConditions.Temperature.Metric.Unit}</p>
                </div>
            )}

            {/* Display 5-day forecast */}
            {forecast.length > 0 && (
                <div>
                    <h3>5-Day Forecast</h3>
                    <ul>
                        {forecast.map((day, index) => (
                            <li key={index}>
                                <strong>{new Date(day.Date).toDateString()}</strong> - {day.Day.IconPhrase}
                                <br />
                                High: {day.Temperature.Maximum.Value}°{day.Temperature.Maximum.Unit},
                                Low: {day.Temperature.Minimum.Value}°{day.Temperature.Minimum.Unit}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Weather;
