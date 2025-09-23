import { useEffect, useMemo, useState } from 'react';
import countryService from './services/countries';
import Search from './components/Search';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Notification from './components/Notification';

function App() {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        countryService.getAll()
            .then(data => {
                console.log('Loaded countries:', data.length); // TEMP
                setCountries(data);
            })
            .catch(err => {
                console.error('Fetch failed:', err);            // TEMP
                setError(err.message || 'Fetch failed');
            });
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return countries.filter((c) =>
            c?.name?.common?.toLowerCase().includes(q)
        );
    }, [countries, query]);

    let content;
    if (!query) {
        content = null;
    } else if (filtered.length > 10) {
        content = <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
        content = <CountriesList countries={filtered} />;
    } else if (filtered.length === 1) {
        content = <CountryDetails country={filtered[0]} />;
    } else {
        content = <p>No matches</p>;
    }

    return (
        <div style={{ lineHeight: 1.6 }}>
            <Search value={query} onChange={setQuery} />
            <Notification message={error} type="error" />
            <div style={{ marginTop: 12 }}>{content}</div>
        </div>
    )
}

export default App
