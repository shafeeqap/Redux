import { combineReducers } from "redux";
import counterReducer from "./counter/counterReducer";
import { formReducer } from "./form/formReducer";

export const rootReducer = combineReducers ({
    counter: counterReducer,
    form: formReducer
})