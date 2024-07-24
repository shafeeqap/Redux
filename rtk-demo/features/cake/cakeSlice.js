const createSlice = require('@reduxjs/toolkit').createSlice

const initialState ={
    numOfCakes: 10,
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers : { // Reducers that specify how the state changes in response to actions
        ordered: (state) =>{
            state.numOfCakes--
        },
        restocked: (state, action) =>{
            state.numOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions