const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json()) // JSON body parser

// --- Persons dataset ---
let persons =[
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
    ]

// STEP3,7-3,8 Morgan config
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
// Use :body only if POST, otherwise it's empty string
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// --- Routes ---
// STEP 3.1
app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

// STEP 3,3 single note
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    console.log('looking for id:', id, 'in', persons.map(p => p.id))
    const p = persons.find(p => p.id === id)

    if (p) {
        res.json(p)
    } else {
        return res.status(404).end()
    }
})

// STEP 3.4 delete
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

//STEP 3,5 post & STEP3,6 Validation
const generateId = () => Math.floor(Math.random() * 1_000_000_000)
app.post('/api/persons', (req, res) => {
    const body = req.body
    // Validate required fields
    if (!body.name || !body.number){
        return res.status(404).json({error: 'The name or number is missing'})
    }
    // Validate uniqueness by name (case-sensitive per exercise norm)
    const exits = persons.some(p => p.name === body.name)
    if (exits) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const personNew = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(personNew)
    res.status(201).json(personNew)
})

// --- middleware: unknown endpoint (after routes)
const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// --- Start server ---
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
