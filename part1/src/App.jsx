const Header = (props) => {
  console.log(props)
  return (
  <div>
  <p>
    {props.course}
  </p>
  </div>
  )
}
const Content = (props) => {
  console.log(props)
  return (
  <div>
  <p>
    {props.part} {props.exercises}
  </p>
  </div>
  )
} 

const Total = (props) => {
  console.log(props)
  return (
  <div>
  <p>
    Number of exercises {props.exercises}
  </p>
  </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part = ['Fundamentals of React','Using props to pass data','State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content part={part} excercises={exercises} />
      <Total excercises={exercises} />
    </div>
  )
}


export default App