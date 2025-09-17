import Person from "./Person";

const Persons = ({ persons }) => (
    <ul>
        {persons.map((p) => (
            <Person key={p.id} name={p.name} number={p.number} />
        ))}
    </ul>
);

export default Persons;
