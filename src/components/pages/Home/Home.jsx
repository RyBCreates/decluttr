import RightSideBar from "../../RightSideBar/RightSideBar";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Daily Task</h1>
      </div>
      <RightSideBar />
    </div>
  );
}

export default Home;
