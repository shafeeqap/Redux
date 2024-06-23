import { DECREMENT, INCREMENT, INCREMENTBY_5 } from "./counterType";


// action creater
export const increment = ()=>{
    return {
        type: INCREMENT
    }
}
// action creater
export const decrement = ()=>{
    return {
        type: DECREMENT
    }
}
// action creater
export const incrementby_5 = (number)=>{
    return {
        type: INCREMENTBY_5,
        payload: number,
    }
}