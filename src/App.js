import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdditionGame() {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    open: false,
  });

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const startGame = () => {
    setQuestions(generateQuestions(10));
    setScore(0);
    setLives(3);
    setTime(0);
    setGameOver(false);
  };

  const generateQuestions = (num) => {
    const questions = [];
    for (let i = 0; i < num; i++) {
      const num1 = Math.floor(Math.random() * 99) + 1;
      const num2 = Math.floor(Math.random() * 99) + 1;
      const sum = num1 + num2;
      questions.push({ num1, num2, sum });
    }
    return questions;
  };

  const generateOptions = () => {
    const correctAnswer = currentQuestion.sum;
    const options = [correctAnswer];
    while (options.length < 3) {
      const randomAnswer = Math.floor(Math.random() * 99) + 1;
      if (options.indexOf(randomAnswer) === -1) {
        options.push(randomAnswer);
      }
    }
    setOptions(options.sort(() => Math.random() - 0.5));
  };

  const handleAnswerSelection = (event) => {
    setCurrentAnswer(event.target.value);
    const selectedAnswer = parseInt(event.target.value);
    if (selectedAnswer === currentQuestion.sum) {
      setSnackbar({ message: "Correct!", open: true });
      setScore((prevScore) => prevScore + 1);
      setOptions([]);
      setCurrentAnswer("");
      setCurrentQuestion(questions.shift());
    } else {
      setSnackbar({ message: "Incorrect!", open: true });
      setLives((prevLives) => prevLives - 1);
      if (lives === 1) {
        setGameOver(true);
      } else {
        setOptions([]);
        setCurrentAnswer("");
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ message: "", open: false });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Addition Game</h1>
      <button onClick={startGame}>Start</button>
</div>
)}

