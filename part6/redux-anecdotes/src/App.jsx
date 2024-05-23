import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes) // 只选择 anecdotes 部分
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>has {anecdote.votes} <button onClick={() => handleVote(anecdote.id)}>vote</button></p>
        </div>
      ))}
    </div>
  )
}

export default App