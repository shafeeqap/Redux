import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { submit } from './features/formSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const dispatch = useDispatch();
  return (
    <div>
        <input type="text" placeholder='Enter name' onChange={(e)=> setName(e.target.value)} value={name}/>
        <input type="text" placeholder='Enter age' onChange={(e)=> setAge(e.target.value)} value={age}/>
        <button onClick={() => dispatch(submit({name, age}))}>Submit</button>
    </div>
  )
}

export default Form