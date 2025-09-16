import { useState } from "react";
import { NavLink } from "react-router-dom";
import RightSideBar from "../../RightSideBar/RightSideBar";
import { quizData } from "../../../utils/quizData/quizData";
import "./Quiz.css";

function Quiz({ achievements }) {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(quizData[index]);
  let [selectedOption, setSelectedOption] = useState(null);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [attempt, setAttempt] = useState(1);
  const [locked, setLocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    if (selectedOption === question.answer) {
      setScore((prev) => prev + 1);
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (submitted) {
      if (index === quizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizData[index]);
      setSubmitted(false);
      setSelectedOption(null);
    }
  };

  const checkResult = () => {
    if (score <= 3) return null;
    if (score === 4) return 5;
    return 10;
  };

  const resetQuiz = () => {
    if (attempt < 3) {
      setIndex(0);
      setQuestion(quizData[0]);
      setScore(0);
      setResult(false);
      setSubmitted(false);
      setSelectedOption(null);
      setAttempt(++attempt);
    } else setLocked(true);
  };

  const claimReward = () => {
    setLocked(true);
  };

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h2 className="quiz__title">Daily Quiz</h2>
        <p className="quiz__attempts">Attempt {attempt} of 3</p>
        {result ? (
          <div className="quiz__content">
            <p className="quiz__result">
              You scored {score} out of {quizData.length}
            </p>
            {score > 3 ? (
              <>
                {locked ? (
                  <>
                    <p className="quiz__claimed-message">
                      Come back tomorrow to earn even more gems!
                    </p>
                    <NavLink
                      className="quiz__button quiz__return-button"
                      to="/"
                    >
                      Return Home
                    </NavLink>
                  </>
                ) : (
                  <>
                    <p className="quiz__reward">
                      Congrats, you received{" "}
                      <span className="quiz__reward_bold">
                        {checkResult()} Gems!
                      </span>{" "}
                      Come back tomorrow for another chance!
                    </p>
                    <button
                      className="quiz__button quiz__reward-button"
                      onClick={claimReward}
                      disabled={locked}
                    >
                      Claim Reward
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {locked ? (
                  <>
                    <p>
                      You have run out of attempts today, come back again
                      tomorrow to try again!
                    </p>
                    <NavLink
                      className="quiz__button quiz__return-button"
                      to="/"
                    >
                      Return Home
                    </NavLink>
                  </>
                ) : (
                  <>
                    <button
                      className="quiz__button"
                      onClick={resetQuiz}
                      disabled={locked}
                    >
                      Reset
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="quiz__content">
            <p className="quiz__question-number">
              Question {index + 1} of {quizData.length}{" "}
            </p>
            <h3 className="quiz__question">
              {index + 1}. {question.question}{" "}
            </h3>
            <ul className="quiz__options">
              <li
                className={`quiz__option
    ${
      submitted && question.answer === 1
        ? "quiz__option_correct"
        : selectedOption === 1
        ? "quiz__option_selected"
        : ""
    }
    ${
      submitted && selectedOption === 1 && question.answer !== 1
        ? "quiz__option_incorrect"
        : ""
    }`}
                onClick={() => {
                  !submitted && setSelectedOption(1);
                }}
              >
                A. {question.option1}
              </li>
              <li
                className={`quiz__option
    ${
      submitted && question.answer === 2
        ? "quiz__option_correct"
        : selectedOption === 2
        ? "quiz__option_selected"
        : ""
    }
    ${
      submitted && selectedOption === 2 && question.answer !== 2
        ? "quiz__option_incorrect"
        : ""
    }`}
                onClick={() => {
                  !submitted && setSelectedOption(2);
                }}
              >
                B. {question.option2}
              </li>
              <li
                className={`quiz__option
    ${
      submitted && question.answer === 3
        ? "quiz__option_correct"
        : selectedOption === 3
        ? "quiz__option_selected"
        : ""
    }
    ${
      submitted && selectedOption === 3 && question.answer !== 3
        ? "quiz__option_incorrect"
        : ""
    }`}
                onClick={() => {
                  !submitted && setSelectedOption(3);
                }}
              >
                C. {question.option3}
              </li>
              <li
                className={`quiz__option
    ${
      submitted && question.answer === 4
        ? "quiz__option_correct"
        : selectedOption === 4
        ? "quiz__option_selected"
        : ""
    }
    ${
      submitted && selectedOption === 4 && question.answer !== 4
        ? "quiz__option_incorrect"
        : ""
    }`}
                onClick={() => {
                  !submitted && setSelectedOption(4);
                }}
              >
                D. {question.option4}
              </li>
            </ul>
            {submitted ? (
              <button
                className="quiz__button"
                type="button"
                onClick={nextQuestion}
              >
                Next
              </button>
            ) : (
              <button
                className="quiz__button"
                type="button"
                disabled={selectedOption === null}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
      <RightSideBar achievements={achievements} />
    </div>
  );
}

export default Quiz;
