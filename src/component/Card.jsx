import { useEffect, useState } from "react";

const Card = ({ increment, limit }) => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedBack, setFeedBack] = useState();

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumbers = () => {
    const newFirstNumber = getRandomInt(0, limit);
    setFirstNumber(newFirstNumber);
    setSecondNumber(getRandomInt(0, limit - newFirstNumber));
  };

  const checkAnswer = () => {
    if (userAnswer && parseInt(userAnswer, 10) === firstNumber + secondNumber) {
      setFeedBack("Correct!");
      increment();
      generateNumbers();
      setUserAnswer("");
      setTimeout(() => {
        setFeedBack(null);
      }, 2000);
    } else {
      setFeedBack("Incorrect. Try again.");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setUserAnswer(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  useEffect(() => {
    generateNumbers();
  }, []);
  return (
    <div>
      {feedBack && <h2>{feedBack}</h2>}
      {firstNumber} + {secondNumber}
      <br />
      <input
        autoFocus
        value={userAnswer}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Card;
