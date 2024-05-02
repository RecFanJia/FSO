import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/filteredpersons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567",
      id: 1},
      { name: 'Ada Lovelace', 
      number: '39-44-5323523', 
      id: 2 },
      { name: 'Dan Abramov', 
      number: '12-43-234345', 
      id: 3 },
      { name: 'Mary Poppendieck', 
      number: '39-23-6423122', 
      id: 4 }  
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      filterName={filterName} 
      handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      persons={persons}
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      setPersons={setPersons}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
      persons={persons}
      filterName={filterName} 
      />
    </div>
  )
}

export default App