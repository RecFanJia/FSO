import React, { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {
  const [notification, setNotification] = useState('')

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.error) {
    return <div>Anecdote service not available due to problems in server on localhost</div>
  }

  const anecdotes = Array.isArray(result.data) ? result.data : []

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={notification} />
      <AnecdoteForm setNotification={setNotification} />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
