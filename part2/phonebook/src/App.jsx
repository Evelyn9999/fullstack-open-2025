import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    // ✅ Fetch once on mount
    useEffect(() => {
       personService
           .getAll()
           .then(initialPersons => {
               setPersons(initialPersons)
           })
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
        const newObject = {
            name,
            number,
        }
        personService
            .create(newObject)
            .then(returnedPerson => {
                setPersons([...persons, returnedPerson])
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        const personDelete = persons.find(p => p.id === id)

        if(window.confirm(`Delete ${personDelete.name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch((err) => {
                    console.log('DELETE failed', { id, err, status: err.response?.status })
                    alert(`'${personDelete.name}' was already removed from server`)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
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
            <Persons persons={personsToShow} deletePerson={deletePerson}/>
        </div>
    )
}

export default App