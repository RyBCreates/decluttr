import { Routes, Route } from "react-router-dom";
import SideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";
import Quiz from "../pages/Quiz/Quiz";

import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="quiz" element={<Quiz />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
