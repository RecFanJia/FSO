import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())

  // 使用 useMemo 来缓存计算结果
  const filteredAndSortedAnecdotes = useMemo(() => {
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  }, [anecdotes, filter])

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
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
