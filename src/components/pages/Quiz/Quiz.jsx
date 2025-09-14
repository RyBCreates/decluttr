import RightSideBar from "../../RightSideBar/RightSideBar";

import "./Quiz.css";

function Quiz() {
  return (
    <div className="quiz">
      <div className="quiz__content">
        <h2 className="quiz__title">Daily Quiz</h2>
      </div>
      <RightSideBar />
    </div>
  );
}

export default Quiz;
