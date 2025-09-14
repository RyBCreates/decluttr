import { useState } from "react";
import RightSideBar from "../../RightSideBar/RightSideBar";
import { quizData } from "../../../utils/quizData/quizData";
import "./Quiz.css";

function Quiz() {
  const [option1, setOption1] = useState(1);

  const answer = option1;
  const isAnswerCorrect = () => {
    if (answer === 2) console.log("You got it right");
    else console.log("try again");
  };
  return (
    <div className="quiz">
      <div className="quiz__container">
        <h2 className="quiz__title">Daily Quiz</h2>
        <p className="quiz__attempts">Attempt 1 of 3</p>
        <div className="quiz__content">
          <p className="quiz__question-number">Question 1 of 5</p>
          <h3 className="quiz__question">1. How Many Hours are in a day?</h3>
          <ul className="quiz__options">
            <li className="quiz__option">
              <button className="quiz__option-button" type="button">
                A. 24 Hours
              </button>
            </li>
            <li className="quiz__option">
              <button className="quiz__option-button" type="button">
                B. 2 Hours
              </button>
            </li>
            <li className="quiz__option">
              <button className="quiz__option-button" type="button">
                C. 4 Hours
              </button>
            </li>
            <li className="quiz__option">
              <button className="quiz__option-button" type="button">
                D. 42 Hours
              </button>
            </li>
          </ul>
          <button
            className="quiz__submit-button"
            type="submit"
            onClick={() => {
              console.log(isAnswerCorrect());
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <RightSideBar />
    </div>
  );
}

export default Quiz;
