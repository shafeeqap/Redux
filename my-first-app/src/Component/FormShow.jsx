import React from "react";
import { useSelector } from "react-redux";

const FormShow = () => {
    // const name = useSelector((state)=>state.form.name)
    // const age = useSelector((state)=>state.form.age)
    
    const {name, age} = useSelector((state)=>state.form) 

  return (
    <>
    <div>
      <div style={{marginTop:"30px"}}>Name:{name}</div>
      <div style={{marginTop:"30px"}}>Age:{age}</div>
    </div>
    </>
  );
};

export default FormShow;
