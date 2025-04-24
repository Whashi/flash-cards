import { useState } from "react";
import "./App.css";
import Card from "./component/Card";

function App() {
  const LIMIT = 10;
  const TIME_LIMIT = 3;
  const GOAL = 100;

  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const startTimer = () => {
    setTimer(TIME_LIMIT * 60 * 1000);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  return (
    <>
      <h1>Aitana's Flash Cards</h1>
      {timer > 0 && count < GOAL ? (
        <div>
          <h2>Count: {count}</h2>
          <h2>Time Left: {Math.floor(timer / 1000)} seconds</h2>
          <Card increment={increment} limit={LIMIT} />
        </div>
      ) : (
        <div>
          {count > 0 && <h3>You got {count} answers</h3>}
          <button onClick={startTimer}>Start</button>
        </div>
      )}
    </>
  );
}

export default App;
