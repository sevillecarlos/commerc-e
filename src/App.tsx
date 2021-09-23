import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        boxShadow: "1px 4px 13px 2px #000000",
        borderRadius:'20px'
      }}
    >
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
