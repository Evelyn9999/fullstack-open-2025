import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { id: 1, name: "Arto Hellas",     number: "040-123456" },
        { id: 2, name: "Ada Lovelace",    number: "39-44-5323523" },
        { id: 3, name: "Dan Abramov",     number: "12-43-234345" },
        { id: 4, name: "Mary Poppendieck",number: "39-23-6423122" },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault() // prevents page reload

        const name = newName.trim();
        const number = newNumber.trim();
        if (!name || !number) return;

        // check if the name already exists
        const exists = persons.some(
            p => p.name.toLowerCase() === name.toLowerCase()
        )
        if (exists) {
            alert(`${name} is already added to phonebook`)
            return
        }

        // add new Object
        const nextId = Math.max(...persons.map(p => p.id), 0) + 1
        const newObject = {
            id: nextId,
            name,
            number,
        }

        setPersons(persons.concat(newObject)) // add new person
        setNewName('')  // clear input
        setNewNumber('')
    }

    const personToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    number: <input
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personToShow.map((p) => <li key={p.id}>{p.name} {p.number}</li>)}
            </ul>
        </div>
    )
}

export default App