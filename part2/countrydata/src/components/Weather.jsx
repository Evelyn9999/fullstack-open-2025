import { useEffect, useState } from 'react';
import { getByCoords, getByCity } from '../services/weather';

export default function Weather({ capital, latlng }) {
    const [data, setData] = useState(null);
    const [err, setErr] = useState('');

    useEffect(() => {
        setData(null); setErr('');
        const load = async () => {
            try {
                if (latlng && latlng.length === 2) {
                    const [lat, lon] = latlng;
                    setData(await getByCoords(lat, lon));
                } else {
                    setData(await getByCity(capital));
                }
            } catch (e) {
                setErr(e.message || 'Failed to fetch weather');
            }
        };
        if (capital) load();
    }, [capital, latlng?.[0], latlng?.[1]]);

    if (err) return <p style={{color:'#c00'}}>Weather error: {err}</p>;
    if (!data) return null;

    const temp = Math.round(data.main?.temp);
    const wind = data.wind?.speed;
    const icon = data.weather?.[0]?.icon;   // e.g. "04d"
    const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

    return (
        <div style={{ marginTop: 24 }}>
            <h2>Weather in {capital}</h2>
            <p>Temperature {temp} °C</p>
            {iconUrl && <img src={iconUrl} alt={data.weather?.[0]?.description || 'weather icon'} />}
            <p>Wind {wind} m/s</p>
        </div>
    );
}
