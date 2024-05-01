import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StaticLine = props => (
  <div>
    {props.text}: {props.value}
  </div>
)

const Statistics = (props) => {
  console.log(props)
  const totalfeedback = props.good + props.neutral + props.bad
  const totalscore = props.good * 1 + props.bad * (-1)
  const average = totalscore / totalfeedback
  const positive = props.good / totalfeedback * 100

  if (totalfeedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StaticLine text={"good"} value={props.good} />
      <StaticLine text={"neutra"} value={props.neutral} />
      <StaticLine text={"bad"} value={props.bad} />
      <StaticLine text={"average"} value={average} />
      <StaticLine text={"positive"} value={`${positive} %`} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleLeftClick = () => {setGood(good + 1)}
  const handleMidClick = () => {setNeutral(neutral + 1)  }
  const handleRightClick = () => {setBad(bad + 1)  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleLeftClick} text='good' />
      <Button handleClick={handleMidClick} text='neutral' />
      <Button handleClick={handleRightClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App