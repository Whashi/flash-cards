import { useEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import SpellingCard from "./component/SpellingCard";
import Header from "./component/Header";
import StartMenu from "./component/StartMenu";

function App() {
  const LIMIT = 9;
  const TIME_LIMIT = 6;
  const GOAL = 100;

  const OPERATIONS_CONFIG = {
    "+": {
      name: "Addition",
      description: "Practice adding numbers",
      icon: "➕",
    },
    "-": {
      name: "Subtraction",
      description: "Practice subtracting numbers",
      icon: "➖",
    },
    spelling: {
      name: "Spelling",
      description: "Practice spelling words",
      icon: "✏️",
    },
  };

  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [feedBack, setFeedBack] = useState("You got this...");
  const [feedBackClass, setFeedBackClass] = useState("");
  const [operation, setOperation] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Add listener for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

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
    setOperation("");
    return () => clearInterval(interval);
  };

  useEffect(() => {
    return () => clearInterval();
  }, []);

  const handleOperationSelect = (selectedOperation) => {
    if (operation === "Spelling") {
      startTimer();
    }
    setOperation(selectedOperation);
  };

  return (
    <div className="container">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      {operation ? (
        <div className="game-container">
          <div className="stats">
            <h2 className={`feedback ${feedBackClass}`}>{feedBack}</h2>
            <h2>
              Count: <br />
              {count}
            </h2>
            {timer > 0 && (
              <h2>
                Time Left: <br />
                {Math.floor(timer / 1000)} seconds
              </h2>
            )}
          </div>
          {operation === "spelling" ? (
            <SpellingCard
              increment={increment}
              setFeedBack={setFeedBack}
              setFeedBackClass={setFeedBackClass}
            />
          ) : (
            <Card
              increment={increment}
              limit={LIMIT}
              setFeedBack={setFeedBack}
              setFeedBackClass={setFeedBackClass}
              operation={operation}
            />
          )}
        </div>
      ) : (
        <StartMenu
          count={count}
          operations={OPERATIONS_CONFIG}
          onSelectOperation={handleOperationSelect}
        />
      )}
    </div>
  );
}

export default App;
