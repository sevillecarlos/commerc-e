import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
