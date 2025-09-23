function Search({ value, onChange }) {
    return (
        <label>
            find countries{' '}
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="type e.g. swi"
            />
        </label>
    )
}
export default Search