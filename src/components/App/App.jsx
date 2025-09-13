import { Routes, Route } from "react-router-dom";
import SideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
