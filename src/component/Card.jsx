import { useEffect, useState } from "react";
import {
  generateAdditionNumbers,
  generateSubtactionNumbers,
} from "../services/arithmaticService";

const OPERATIONS = {
  "+": {
    generate: generateAdditionNumbers,
    calculate: (a, b) => a + b,
  },
  "-": {
    generate: generateSubtactionNumbers,
    calculate: (a, b) => a - b,
  },
};

const Card = ({
  increment,
  limit,
  setFeedBack,
  setFeedBackClass,
  operation,
}) => {
  const [numbers, setNumbers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const checkAnswer = () => {
    if (
      userAnswer &&
      parseInt(userAnswer, 10) ===
        OPERATIONS[operation].calculate(numbers[0], numbers[1])
    ) {
      setFeedBack("Correct!");
      setFeedBackClass("correct");
      increment();
      setNumbers(() => OPERATIONS[operation].generate(limit, numbers[0]));
      setUserAnswer("");
      const timer = setTimeout(() => {
        setFeedBack(" ");
        setFeedBackClass("");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setFeedBack(`${userAnswer} is incorrect. Try again.`);
      setFeedBackClass("incorrect");
    }
  };

  useEffect(() => {
    if (userAnswer !== "") {
      checkAnswer();
    }
  }, [userAnswer]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setUserAnswer(value);
    }
  };

  useEffect(() => {
    setNumbers(() => OPERATIONS[operation].generate(limit, 0));
  }, []);

  return (
    <div className="card">
      <h3>{numbers[0]}</h3>{" "}
      <h3>
        {operation} {numbers[1]}
      </h3>
      <hr />
      <input
        type="number"
        inputMode="numeric"
        autoFocus
        value={userAnswer}
        onChange={handleChange}
      />
    </div>
  );
};

export default Card;
