// src/App.js
import  'react';
import Weather from './Weather';
import CarBrands from './CarBrands';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Weather & Car Information App</h1>
            <Weather />
            <CarBrands />
        </div>
    );
}

export default App;
