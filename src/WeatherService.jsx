// src/WeatherService.js
import axios from 'axios';

const API_KEY = 'duIaPt9LqgIdWm7K9Udz4shwAvIAMB9H';
const BASE_URL = 'http://dataservice.accuweather.com';

// Function to get the location key for a city
export const getLocationKey = async (city) => {
    const url = `${BASE_URL}/locations/v1/cities/search`;
    try {
        const response = await axios.get(url, {
            params: {
                apikey: API_KEY,
                q: city,
            },
        });
        return response.data[0].Key; // Get the first location key
    } catch (error) {
        console.error('Error fetching location key:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to get the weather forecast for a location
export const getWeatherForecast = async (locationKey) => {
    const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`;
    try {
        const response = await axios.get(url, {
            params: {
                apikey: API_KEY,
                metric: true, // Use metric units
            },
        });
        return response.data.DailyForecasts; // Return the daily forecasts
    } catch (error) {
        console.error('Error fetching weather forecast:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// New function to get the current weather conditions
export const getCurrentConditions = async (locationKey) => {
    const url = `${BASE_URL}/currentconditions/v1/${locationKey}`;
    try {
        const response = await axios.get(url, {
            params: {
                apikey: API_KEY,
            },
        });
        return response.data[0]; // Return the current weather conditions
    } catch (error) {
        console.error('Error fetching current conditions:', error.response ? error.response.data : error.message);
        throw error;
    }
};
