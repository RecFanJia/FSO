import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useState('')

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      setNotification('The anecdote is too short. It must be at least 5 characters long.')
      setTimeout(() => {
        setNotification('')
      }, 5000)
      return
    }

    console.log('new anecdote')
    const getId = () => (100000 * Math.random()).toFixed(0)
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
