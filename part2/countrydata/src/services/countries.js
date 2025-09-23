import axios from 'axios'

const BASE = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getAll = () =>
    axios.get(`${BASE}/all`).then(res => res.data)

export default {getAll}