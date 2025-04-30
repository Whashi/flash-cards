import { useState } from "react";
import "./App.css";
import Card from "./component/Card";

function App() {
  const LIMIT = 9;
  const TIME_LIMIT = 6;
  const GOAL = 100;

  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [feedBack, setFeedBack] = useState(" ");
  const [feedBackClass, setFeedBackClass] = useState("");
  const [operation, setOperation] = useState("");

  const increment = () => {
    setCount(count + 1);
  };

  const startTimer = () => {
    setCount(0);
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

  const handleAddition = () => {
    startTimer();
    setOperation("+");
  };

  const handleSubtraction = () => {
    startTimer();
    setOperation("-");
  };

  return (
    <div className="container">
      <h1>Aitana's Flash Cards</h1>
      {timer > 0 && count < GOAL ? (
        <div>
          <h2 className={`feedback ${feedBackClass}`}>{feedBack}</h2>
          <h2>Count: {count}</h2>
          <h2>Time Left:</h2>
          <h2> {Math.floor(timer / 1000)} seconds</h2>
          <Card
            increment={increment}
            limit={LIMIT}
            setFeedBack={setFeedBack}
            setFeedBackClass={setFeedBackClass}
            operation={operation}
          />
        </div>
      ) : (
        <div>
          {count > 0 && <h3>You got {count} answers</h3>}
          <button onClick={handleAddition}>Start +</button>
          <button onClick={handleSubtraction}>Start -</button>
        </div>
      )}
    </div>
  );
}

export default App;
