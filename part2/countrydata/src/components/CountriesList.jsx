function CountriesList({ countries }) {
    return (
        <ul>
            {countries.map((c) => (
                <li key={c.cca3}>{c.name.common}</li>
            )) }
        </ul>
    )
}
export default CountriesList