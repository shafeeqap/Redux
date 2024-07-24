import {createSlice} from '@reduxjs/toolkit'

const initialState={
    count: 0,
    count2: 10
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment:(state, action)=>{
            state.count = state.count + 1
        },
        decrement:(state, action)=>{
            state.count = state.count - 1
        },
        incrementby5:(state, action)=>{
            state.count2 = state.count2 + 5
        }
    }
})

export default counterSlice.reducer
export const {increment, decrement, incrementby5} = counterSlice.actions // Export actions
