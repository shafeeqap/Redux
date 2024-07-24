import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementby5 } from './features/counterSlice';
import Form from './Form';


const App = () => {
  const {count, count2} = useSelector((state) => state.counter);
  const {name, age} = useSelector((state)=> state.form)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Redux Toolkit</h1>
      <h2>Count:{count}</h2>
      <h2>Count 2:{count2}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementby5())}>Incrementby5</button>
      <Form/>

      <p>Name : {name}</p>
      <p>Age : {age}</p>

    </div>
  )
}

export default App