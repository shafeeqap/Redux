import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementby_5 } from '../redux/counter/counterAction'

const Counter = () => {

  const count = useSelector((state)=> state.counter.count) // access initial state value (count)
  const count2 = useSelector((state)=> state.counter.count2)

  const dispatch = useDispatch() // pass action (dispatch)


  return (
    <div>
      Count: {count}
        <div>
                            {/* call action creater dispatch(increment) */}
            <button onClick={()=> dispatch(increment())}>Increment</button>
            <button onClick={()=>dispatch(decrement())}>Decrement</button>
            Count_2: {count2} 
            <button onClick={()=>dispatch(incrementby_5(5))}>Increment by_5</button>
        </div>
    </div>
  )
}

export default Counter