import { SUBMIT_FORM } from "./formType"

// action creater
export const submitForm = ({name, age})=>{
    return {
        type:SUBMIT_FORM,
        name, 
        age,
    }
}