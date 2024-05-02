const Persons = (props) =>{
    const listStyle = {
        listStyleType: 'none',
        padding: 0,
        }

    
    return(
    <ul style={listStyle}>
        {props.persons.filter(person => 
        person.name.toLowerCase().includes(props.filterName.toLowerCase())).map(person => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
    </ul>
    )
  }

  export default Persons