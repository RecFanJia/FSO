import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  const handleVote = (anecdote) => {
    anecdote.votes += 1
    updateAnecdoteMutation.mutate(anecdote)
  }

  if (!Array.isArray(anecdotes)) {
    return <div>No anecdotes available.</div>
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
