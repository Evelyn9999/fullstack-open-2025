const Header = ({name}) => <h2>{name}</h2>

const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
)
const Content = ({parts}) => (
    <div>
        {parts.map((p) => (
            <Part key={p.id} part={p} />
        ))}
    </div>
)

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

// Courses Comb combines Header + Content
const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>
)

// CourseList with arbitrary numbers
const Courses = ( {courses} ) => (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map((c) => (
            <Course key={c.id} course={c} />
        ))}
    </div>
)

export default Courses