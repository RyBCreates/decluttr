import RightSideBar from "../../RightSideBar/RightSideBar";
import "./Quiz.css";

function Quiz() {
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
          <button className="quiz__submit-button" type="submit">
            Submit
          </button>
        </div>
      </div>
      <RightSideBar />
    </div>
  );
}

export default Quiz;
