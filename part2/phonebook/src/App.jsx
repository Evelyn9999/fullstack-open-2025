import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' , number: '040-1234567'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault() // prevents page reload

        // check if the name already exists
        if (persons.some(person => person.name === newName)) {
            alert('${newName} is already added to phonebook')
            return
        }

        const newObject = {
            name: newName.trim(),
            number: newNumber.trim(),
        }
        setPersons(persons.concat(newObject)) // add new person
        setNewName('')  // clear input
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map((p, i) => <li key={i}>{p.name} {p.number}</li>)}
            </ul>
        </div>
    )
}

export default App