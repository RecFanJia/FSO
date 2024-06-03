import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: action.payload.votes
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToVote = state.anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const updated = await anecdoteService.changeVote(updatedAnecdote)
    dispatch(updateAnecdote(updated))
  }
}

export default anecdotesSlice.reducer
