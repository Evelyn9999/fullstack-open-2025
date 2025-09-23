import axios from 'axios';

const KEY  = import.meta.env.VITE_OWM_KEY;
// after const KEY = import.meta.env.VITE_OWM_KEY;
console.log('OWM key loaded?', KEY ? `yes (…${KEY.slice(-4)})` : 'NO');
const BASE = 'https://api.openweathermap.org/data/2.5/weather';

export function getByCoords(lat, lon) {
    if (!KEY) throw new Error('Missing OpenWeather API key');
    return axios.get(BASE, { params: { lat, lon, appid: KEY, units: 'metric' } })
        .then(r => r.data);
}

export function getByCity(q) {
    if (!KEY) throw new Error('Missing OpenWeather API key');
    return axios.get(BASE, { params: { q, appid: KEY, units: 'metric' } })
        .then(r => r.data);
}
