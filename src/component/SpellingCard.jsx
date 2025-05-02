import React from "react";
import { useEffect, useState } from "react";
import { firstGradeSpellingWords } from "../data/spellingWords";

const SpellingCard = ({ increment, setFeedBack, setFeedBackClass }) => {
  const [spellingWords, setSpellingWords] = useState(firstGradeSpellingWords);
  const [word, setWord] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * spellingWords.length);
    setWord(spellingWords[randomIndex]);
  };

  // Then modify your useEffect to handle the Promise
  useEffect(() => {
    if (word) {
      speak(word).catch((error) => {
        console.error("Speech synthesis error:", error);
        setFeedBack("Couldn't speak the word");
        setFeedBackClass("incorrect");
      });
    }
  }, [word]);

  useEffect(() => {
    chooseRandomWord();
  }, []);

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === word.toLowerCase()) {
      setFeedBack("Correct!");
      setFeedBackClass("correct");
      setSpellingWords(spellingWords.filter((w) => w !== word));
      increment();
      setUserAnswer("");
      chooseRandomWord();
    } else {
      setFeedBack("Try again");
      setFeedBackClass("incorrect");
    }
  };

  const repeatWord = () => {
    speak(word);
    console.log(word);
  };

  const skipWord = () => {
    chooseRandomWord();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z]*$/.test(value)) {
      setUserAnswer(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const speak = (text) => {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Get available voices
      const voices = window.speechSynthesis.getVoices();

      // Try to find a US English female voice
      const voice =
        voices.find(
          (v) => v.lang === "en-US" && v.name.includes("Google US English")
        ) ||
        voices.find((v) => v.lang === "en-US") ||
        voices[0];

      // Configure speech settings
      utterance.voice = voice;
      utterance.lang = "en-US";
      utterance.rate = 0.7; // Slightly slower
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 1.0; // Full volume

      // Add event handlers
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);

      // Speak the word
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div className="spelling-card">
      <input
        className="spelling-input"
        value={userAnswer}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <div className="button-container">
        <button onClick={checkAnswer}>Check</button>
        <button onClick={repeatWord}>Repeat</button>
        <button onClick={skipWord}>Skip</button>
      </div>
    </div>
  );
};

export default SpellingCard;
