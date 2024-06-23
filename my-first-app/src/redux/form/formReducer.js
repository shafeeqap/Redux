import { SUBMIT_FORM } from "./formType";

const initialState = {
    name: "empty",
    age: 0,
};

export const formReducer = (state=initialState, {type, name, age})=>{   // two argument (prevState, action)
    switch (type) {
        case SUBMIT_FORM:
            return {
                ...state,
                name,
                age,
            }
            
        default:
            return state
    }
}
