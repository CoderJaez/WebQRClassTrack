import { useState } from "react";
import "./App.css";
import useBearStore from "./store/bear";

function App() {
  const { bears, increasePopulation } = useBearStore();
  const bears2 = useBearStore.getState();
  // const increment = useBearStore.setState((state) => ({
  //   bears: state.bears + 2,
  // }));
  return (
    <>
      <p>Bears count: {bears}</p>
      <button onClick={increasePopulation}>Increment</button>
      <p>Bears 2: {bears2.bears}</p>
      <button onClick={bears2.increasePopulation}>Increment bear 2</button>

      {/* <button onClick={() => increment}> Increment +2 </button> */}
    </>
  );
}

export default App;
