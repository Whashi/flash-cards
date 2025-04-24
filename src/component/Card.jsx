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
    const newFirstNumber = getRandomInt(1, limit);
    setFirstNumber(newFirstNumber);
    setSecondNumber(getRandomInt(1, limit - newFirstNumber));
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
      setFeedBack(`${userAnswer} is incorrect. Try again.`);
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
    generateNumbers();
  }, []);
  return (
    <div>
      {feedBack && <h2>{feedBack}</h2>}
      {firstNumber} + {secondNumber}
      <br />
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
