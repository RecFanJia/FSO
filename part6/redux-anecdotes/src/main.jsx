import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const rootReducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
