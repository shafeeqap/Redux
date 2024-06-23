import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {submitForm} from '../redux/form/formAction'

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "30px" }}>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        type="text"
        value={name}
      />{" "}
      <br />
      <input
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
        type="text"
        value={age}
        style={{ marginTop: "10px" }}
      />{" "}
      <br />
      <button
        onClick={() => {
          dispatch(submitForm({ name, age }));
        }}
        style={{ marginTop: "10px" }}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
