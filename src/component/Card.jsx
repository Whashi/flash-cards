import { useEffect, useState } from "react";

const Card = ({ increment, limit, setFeedBack, setFeedBackClass }) => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumbers = () => {
    const newFirstNumber = getRandomInt(1, limit);
    console.log(newFirstNumber);

    setFirstNumber(newFirstNumber);
    setSecondNumber(getRandomInt(1, limit - newFirstNumber));
  };

  const checkAnswer = () => {
    if (userAnswer && parseInt(userAnswer, 10) === firstNumber + secondNumber) {
      setFeedBack("Correct!");
      setFeedBackClass("correct");
      increment();
      generateNumbers();
      setUserAnswer("");
      setTimeout(() => {
        setFeedBack(" ");
        setFeedBackClass("");
      }, 2000);
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
    generateNumbers();
  }, []);
  return (
    <div className="card">
      <h3>{firstNumber}</h3> <h3>+ {secondNumber}</h3>
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
