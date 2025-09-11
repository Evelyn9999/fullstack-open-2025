import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
    const allClicks = good + neutral + bad
    const averages = allClicks === 0 ? 0 : (good - bad) / allClicks
    const positives = allClicks === 0 ? 0 : (good / allClicks) * 100

    if (allClicks === 0)
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )

    return (
        <div>
            <h1>statistics</h1>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text="all" value={allClicks} />
            <StatisticLine text='average' value={averages}/>
            <StatisticLine text='positive' value={positives}/>
        </div>
        )
    }

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)



    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good'/>
            <Button onClick={handleNeutralClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App