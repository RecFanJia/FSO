const Course = ({course}) =>{
    return(
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Sum course={course}/>
      </div>
    )
  }
  
  const Header = ({course}) => {
    return(
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Content = ({course}) =>{
    return(
      <div>
        <Part course={course}/>
      </div>
    )
  }
  
    const Part = ({course}) =>{
        const listStyle = {
        listStyleType: 'none',
        padding: 0,
        }
    
        return(
        <div>
            <ul style={listStyle}>
            {course.parts.map(part =>
            <NameExerc key={part.id} part={part} />
            )}
            </ul>
        </div>
        )
    }
  
        const NameExerc = ({part}) => {
            return (
            <li>
                {part.name} {part.exercises}
            </li>
            )
        }
  
  const Sum = ({course}) => {
    const totalExercises = course.parts.reduce((sum, part) => {
      console.log(`sum: ${sum}, part:`, part);
      return sum + part.exercises;
    }, 0);
  
    return (
      <div>
        <h4>total of {totalExercises} exercises</h4>
      </div>
    )
  }

export default Course
  