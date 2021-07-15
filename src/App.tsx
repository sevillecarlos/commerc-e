import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <div style={{width:'50%', margin:'auto'}}>
    <Provider store={store}>
      <Routes />
    </Provider>
    </div>
  );
}

export default App;
