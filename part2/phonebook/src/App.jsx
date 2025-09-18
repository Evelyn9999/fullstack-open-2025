import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    // ✅ Fetch once on mount
    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(res => {
            setPersons(res.data);
        });
    }, []);

    // Handlers stay in App
    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleNameChange   = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);

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
        axios
            .post('http://localhost:3001/persons', newObject)
            .then(res => {
                console.log(res)
                setPersons(persons.concat(res.data))
                setNewName('')
                setNewNumber('')
            })
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                onNameChange={handleNameChange}
                newNumber={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App