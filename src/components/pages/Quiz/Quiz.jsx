import { useState, useRef } from "react";
import RightSideBar from "../../RightSideBar/RightSideBar";
import { quizData } from "../../../utils/quizData/quizData";
import "./Quiz.css";

function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(quizData[index]);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let [guess, setGuess] = useState(null);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const options = [option1, option2, option3, option4];

  const checkAnswer = (e, answer) => {
    if (!locked) {
      if (question.answer === answer) {
        e.target.classList.add("quiz__option_correct");
        setLocked(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("quiz__option_incorrect");
        setLocked(true);
        options[question.answer - 1].current.classList.add(
          "quiz__option_correct"
        );
      }
    }
  };

  const nextQuestion = () => {
    if (locked) {
      if (index === quizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizData[index]);
      setLocked(false);
      options.map((option) => {
        option.current.classList.remove("quiz__option_correct");
        option.current.classList.remove("quiz__option_incorrect");
        return null;
      });
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(quizData[0]);
    setScore(0);
    setLocked(false);
    setResult(false);
  };

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h2 className="quiz__title">Daily Quiz</h2>
        <p className="quiz__attempts">Attempt 1 of 3</p>
        {result ? (
          <div className="quiz__content">
            <p className="quiz__result">
              You scored {score} out of {quizData.length}
            </p>
            <button className="quiz__reset-button" onClick={resetQuiz}>
              Reset
            </button>
          </div>
        ) : (
          <div className="quiz__content">
            <p className="quiz__question-number">
              Question {index + 1} of {quizData.length}
            </p>
            <h3 className="quiz__question">
              {index + 1}. {question.question}
            </h3>
            <ul className="quiz__options">
              <li
                className="quiz__option"
                ref={option1}
                onClick={(e) => {
                  checkAnswer(e, 1);
                }}
              >
                A. {question.option1}
              </li>
              <li
                className="quiz__option"
                ref={option2}
                onClick={(e) => {
                  checkAnswer(e, 2);
                }}
              >
                B. {question.option2}
              </li>
              <li
                className="quiz__option"
                ref={option3}
                onClick={(e) => {
                  checkAnswer(e, 3);
                }}
              >
                C. {question.option3}
              </li>
              <li
                className="quiz__option"
                ref={option4}
                onClick={(e) => {
                  checkAnswer(e, 4);
                }}
              >
                D. {question.option4}
              </li>
            </ul>
            <button
              className="quiz__submit-button"
              type="submit"
              onClick={nextQuestion}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <RightSideBar />
    </div>
  );
}

export default Quiz;
