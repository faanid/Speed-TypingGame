import React, { useState, useEffect, useRef } from "react";

function useWordGame(startingTime = 10) {
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const textBoxRef = useRef(null);

  function startClock() {
    setIsTimeRunning(true);
    setWordCount(0);
    setText("");
    setTimeRemaining(startingTime);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  function endGame() {
    setIsTimeRunning(false);
    const numWords = calculateWordCount(text);
    setWordCount(numWords);
    setTimeRemaining(0);
  }

  function decrementTime() {
    setTimeRemaining((time) => time - 1);
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining !== 0) {
      setTimeout(decrementTime, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [isTimeRunning, timeRemaining]);

  return {
    handleChange,
    startClock,
    textBoxRef,
    timeRemaining,
    wordCount,
    text,
    isTimeRunning,
  };
}

export default useWordGame;
