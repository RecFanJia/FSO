const PersonForm = (props) =>{
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (props.persons.some(person => person.name === props.newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    const personObject = {
      name: props.newName,
      number: props.newNumber,
      id: props.persons.length + 1 
    }
    
    props.setPersons(props.persons.concat(personObject))
    props.setNewName('')
    props.setNewNumber('')
  }
    return(
<form onSubmit= {addPerson}>
        <div>
          name: <input 
          value = {props.newName}
          onChange = {props.handleNameChange}/>
        </div>
        <div>
          number: <input 
          value = {props.newNumber}
          onChange = {props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm