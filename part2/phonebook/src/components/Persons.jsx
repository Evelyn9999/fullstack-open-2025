import Person from "./Person";

const Persons = ({ persons, deletePerson }) => (
    <ul>
        {persons.map((p) => (
            <Person
                key={p.id}
                person={p}
                onDelete={() => deletePerson(p.id)}
            />
        ))}
    </ul>
);

export default Persons;
