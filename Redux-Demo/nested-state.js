const redux = require("redux");
const produce = require('immer').produce


// Immer is a library that simplifies the process of writing immutable update logic.


const initialState = {
  name: "shafeeq",
  address: {
    street: "123 Main St",
    city: "Malappuram",
    state: "Kerala",
  },
};

// Action type
const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// Reducer
const reduce = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };

      /* Immer provides a function called produce, which accepts two arguments: your original state, 
        and a callback function. The callback function is given a "draft" version of that state, 
        and inside the callback, it is safe to write code that mutates the draft value. 
        Immer tracks all attempts to mutate the draft value and then replays those mutations using 
        their immutable equivalents to create a safe, immutably updated result:
      */
      return produce(state, (draft) =>{
        draft.address.street  = action.payload
      })
    default: {
      return state;
    }
  }
};


const store = redux.createStore(reduce);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});
store.dispatch(updateStreet("456 Main St"));
unsubscribe();
