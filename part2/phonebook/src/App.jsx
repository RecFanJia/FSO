import { useState, useEffect  } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/filteredpersons'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = () => {
    console.log(persons)
      if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const lastPersonId = persons.length > 0 ? parseInt(persons[persons.length-1].id) : 0;
    console.log(`lstpersonid is`, lastPersonId)
    const newId = lastPersonId + 1;

    const personObject = {
      name: newName,
      number: newNumber,
      id: (newId).toString() 
    }

    noteService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (id) => {
    const deleteName = persons.find(person => person.id === id).name
    const confirmDeletion = confirm(`Delete ${deleteName}?`);
  if (!confirmDeletion) {
    console.log('Deletion cancelled by user.');
    return; 
  }

    noteService.remove(id)
    .then(() => {
        console.log(`Deleted person with id ${id}`)
    })
    .catch(error => {
        console.error('Error deleting the person:', error)
    })
    const updatedPersons = persons.filter(person => person.id !== id)
    setPersons(updatedPersons)
}


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
      addPerson={addPerson}
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
      persons={persons}
      filterName={filterName} 
      deletePerson={deletePerson}
      />
    </div>
  )
}

export default App