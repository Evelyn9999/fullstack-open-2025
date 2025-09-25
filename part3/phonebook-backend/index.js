const express = require('express')
const app = express()

app.use(express.json()) // JSON body parser

let persons =[
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
    ]

// STEP 3.1
app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
})

// STEP 3,2 info page
app.get('/info', (req, res) => {
    const count = persons.length
    const now = new Date()
    res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${now}</p>
    `)
})



app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
