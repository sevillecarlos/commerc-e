import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <div
      style={{
        width: "75%",
        margin: "auto",
      }}
    >
      <Provider store={store}>
        <Routes />
      </Provider>

    </div>
  );
}

export default App;
