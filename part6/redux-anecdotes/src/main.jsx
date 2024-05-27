import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App'
import anecdoteReducer, { appendAnecdote }from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat()
})

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch(appendAnecdote(anecdote))
  })
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)