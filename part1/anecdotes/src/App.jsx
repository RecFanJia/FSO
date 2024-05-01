import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = (props) => {
  if (props.most === -1) {
    return (
      <div>
        pls vote!
      </div>
    )
  }
  return (
    <div>
      <p>{props.anecdotes[props.most]}</p>
      <p>has {props.votes[props.most]} votes</p>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [most, setMost] = useState(-1)

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1 
    console.log("votes are", newVotes)
    setVotes(newVotes)

    const i = newVotes.indexOf(Math.max(...newVotes));
    setMost(i)
    console.log("mostVoted is", i)
  }

  const next = () => {
    let x = Math.floor(Math.random() * 8)
    console.log("selected is", x)
    setSelected(x)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={vote} text='vote' />
      <Button handleClick={next} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Display most={most} votes={votes} anecdotes= {anecdotes} />
    </div>
  )
}

export default App