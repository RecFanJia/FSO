import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())

  const filteredAndSortedAnecdotes = useMemo(() => {
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  }, [anecdotes, filter])

  const handleVote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(updateVote(id))
    dispatch(showNotification(`You voted for "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {filteredAndSortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>has {anecdote.votes} <button onClick={() => handleVote(anecdote.id)}>vote</button></p>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList