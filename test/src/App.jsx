  import { useState, useEffect } from 'react'
  import axios from 'axios'
  import Note from './components/Note'
  
  
  const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
  
  
  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, [])

  // ...
}

export default App