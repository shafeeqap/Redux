import { DECREMENT, INCREMENT, INCREMENTBY_5 } from "./counterType";

// initial State
const initialState = {
  count: 0,
  count2: 10,
};

// Reducer take two argument (prevState, action) action means action creater
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
        return{
            ...state,
            count: state.count - 1,
        }
    case INCREMENTBY_5:
        return{
            ...state,
            count2: state.count2 + action.payload,
        }

    default:
      return state;
  }
};

export default counterReducer;
