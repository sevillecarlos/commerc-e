import { createStore } from "redux";

const counter = (state: number = 0, action: { type: string }): number => {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  if (action.type === "DECREMENT") {
    return state - 1;
  }
  return state;
};

const store = createStore(counter);

export default store;
