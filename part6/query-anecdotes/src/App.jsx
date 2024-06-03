import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { NotificationProvider } from './components/NotificationContext'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.error) {
    return <div>Anecdote service not available due to problems in server on localhost</div>
  }

  const anecdotes = Array.isArray(result.data) ? result.data : []

  return (
    <NotificationProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} />
      </div>
    </NotificationProvider>
  )
}

export default App
