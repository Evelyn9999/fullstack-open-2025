const Header = ({ course }) => <h1>{course}</h1>

const Part = ({name, exercise}) => (
    <p>{name} {exercise}</p>
)
const Content = ({part1, exercise1, part2, exercise2, part3, exercise3}) => (
    <div>
        <Part name={part1} exercise={exercise1}/>
        <Part name={part2} exercise={exercise2}/>
        <Part name={part3} exercise={exercise3}/>
    </div>
)

const Total = ({ exercises1, exercises2, exercises3 }) => (
    <p>
        Number of exercises {exercises1 + exercises2 + exercises3}
    </p>
)

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} exercise1={exercises1}
                     part2={part2} exercise2={exercises2}
                     part3={part3} exercise3={exercises3}
            />
            <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
        </div>
    )
}

export default App