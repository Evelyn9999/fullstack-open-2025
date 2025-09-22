import {useState, useEffect} from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({ message: null, type: null })

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

    // addPerson: Show Notification
    const showNotice = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification({ message: null, type: null}), 5000)
    }

    const addPerson = (event) => {
        event.preventDefault() // prevents page reload

        const name = newName.trim();
        const number = newNumber.trim();
        if (!name || !number) return;

        // 1) Check if the name already exists
        const existing = persons.find(
            p => p.name.toLowerCase() === name.toLowerCase()
        )
        if (existing) {
            // 2) Ask for confirmation
            const ok = window.confirm(
                `${existing.name} is already added to phonebook, replace the old number with a new one?`
            )
            if (!ok) return

            // 3) PUT update to backend
            const updatedPerson = {...existing, number}
            personService
                .update(existing.id, updatedPerson)
                .then(returnedPerson => {
                    // 4) Replace in state
                    setPersons(persons.map(p => p.id === existing.id ? returnedPerson : p))
                    setNewName('')
                    setNewNumber('')
                    showNotice(`Updated the Number of ${returnedPerson.name}`, 'success');
                })
                .catch(err => {
                    // If it was deleted on server, inform user and clean it from UI
                    showNotice(
                        `Information for '${existing.name}' was already removed from server`,
                        'error'
                    )
                    setPersons(persons.filter(p => p.id !== existing.id))
                })
            return
        }

        // 5) Otherwise create a brand new person + Shoe Nitifications
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
                showNotice(`Added ${returnedPerson.name}`, 'success')
            })
            .catch(err => {
                showNotice('Failed to add person', 'error')
            })
    }

    const deletePerson = (id) => {
        const personDelete = persons.find(p => p.id === id)

        if(window.confirm(`Delete ${personDelete.name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    showNotice(`Deleted ${personDelete.name}`, 'success');
                })
                .catch((err) => {
                    console.log('DELETE failed', { id, err, status: err.response?.status })
                    showNotice(`'${personDelete.name}' was already removed from server`, 'error');
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
            <Notification message={notification.message} type={notification.type} />
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