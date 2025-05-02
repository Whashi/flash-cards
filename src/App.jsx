import { useEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import SpellingCard from "./component/SpellingCard";
import Header from "./component/Header";
import StartMenu from "./component/StartMenu";
import SettingsMenu from "./component/SettingsMenu";

function App() {
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

  //Settings
  const [arithmaticLimit, setArithmaticLimit] = useState(9);
  const [timeLimit, setTimeLimit] = useState(6);
  const [goal, setGoal] = useState(100);

  //Game state
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [feedBack, setFeedBack] = useState("You got this...");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [feedBackClass, setFeedBackClass] = useState("");
  const [operation, setOperation] = useState("");

  //Theme state
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

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const startTimer = () => {
    setCount(0);
    setTimer(timeLimit * 60 * 1000);
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
    if (count >= goal) {
      setFeedBack("You did it!");
      setFeedBackClass("correct");
      setCount(0);
      setOperation("");
      setTimer(0);
    }
  }, [count, goal]);

  useEffect(() => {
    return () => clearInterval();
  }, []);

  const handleOperationSelect = (selectedOperation) => {
    if (operation !== "Spelling") {
      startTimer();
    }
    setOperation(selectedOperation);
  };

  return (
    <div className="container">
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        setOperation={setOperation}
        toggleSettings={toggleSettings}
      />

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
                {Math.floor(timer / 60000)} min{" "}
                {Math.floor((timer % 60000) / 1000)} sec
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
              limit={arithmaticLimit}
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
      <SettingsMenu
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        arithmaticLimit={arithmaticLimit}
        setArithmaticLimit={setArithmaticLimit}
        timeLimit={timeLimit}
        setTimeLimit={setTimeLimit}
        goal={goal}
        setGoal={setGoal}
      />
    </div>
  );
}

export default App;
