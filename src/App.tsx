import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="ribbon">
        <a
          href="https://github.com/sevillecarlos/commerc-e"
          rel="noreferrer"
          target="_blank"
        >
          @sevillecarlos🍒
        </a>
      </div>
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
