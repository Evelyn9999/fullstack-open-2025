const express = require('express')
const app = express()

app.use(express.json()) // JSON body parser

// logger
const requestLogger = (req, _res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}
app.use(requestLogger)

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

// unknown endpoint (after routes)
const unknownEndpoint = (_req, res) => {
    res.status(404).json({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
