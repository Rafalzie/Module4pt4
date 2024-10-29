// src/CarBrands.js
import { useState, useEffect } from 'react';
import { getCarBrands } from './CarService';

const CarBrands = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const carBrands = await getCarBrands();
                setBrands(carBrands);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Unable to fetch car brands.');
            }
        };

        fetchBrands();
    }, []);

    return (
        <div>
            <h2>Car Brands</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {brands.map((brand) => (
                    <li key={brand.codigo}>{brand.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarBrands;
