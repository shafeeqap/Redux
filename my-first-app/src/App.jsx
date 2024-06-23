import React from "react";
import Counter from "./Component/Counter";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Form from "./Component/Form";
import FormShow from "./Component/FormShow";

const App = () => {
  return (
    <>
      {/* conect Redux with React */}
      <Provider store={store}> 
        <Counter />
        <Form/>
        <FormShow/>
      </Provider>
    </>
  );
};

export default App;
