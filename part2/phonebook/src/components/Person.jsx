const Person = ({person, onDelete }) => (
    <li>
        {person.name} {person.number}
        <button onClick={onDelete}>delete</button>
    </li>
);

export default Person
