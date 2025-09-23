function CountriesList({ countries, onShow }) {
    return (
        <ul>
            {countries.map((c) => (
                <li key={c.cca3}>
                    {c.name.common}{' '}
                    <button onClick={() => onShow(c)}>Show</button>
                </li>
            )) }
        </ul>
    )
}
export default CountriesList