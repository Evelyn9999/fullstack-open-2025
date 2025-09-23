import Weather from './Weather';

function CountryDetails({ country }) {
    const name = country?.name?.common ?? '';
    const capital = Array.isArray(country.capital)
        ? country.capital.join(', ')
        : country.capital || '—';
    const area = country.area ?? '—';
    const languages = Object.values(country.languages || {});
    const flag = country?.flags?.png || country?.flags?.svg;
    const flagAlt = country?.flags?.alt || `${name} flag`;
    const latlng = country?.capitalInfo?.latlng;   // [lat, lon] if available

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>Capital</strong> {capital}</p>
            <p><strong>Area</strong> {area}</p>

            <h2>Languages</h2>
            <ul>
                {languages.map((lang) => <li key={lang}>{lang}</li>)}
            </ul>

            {flag && <img src={flag} alt={flagAlt} style={{ maxWidth: 300, height: 'auto' }} />}

            {/* Weather */}
            {capital !== '—' && (
                <Weather capital={capital} latlng={latlng} />
            )}
        </div>
    );
}
export default CountryDetails