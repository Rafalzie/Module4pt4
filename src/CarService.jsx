// src/CarService.js
import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

export const getCarBrands = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/marcas`);
        return response.data;
    } catch (error) {
        console.error('Error fetching car brands:', error.message);
        throw error;
    }
};
