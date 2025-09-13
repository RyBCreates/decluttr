import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";

import { users } from "../../utils/mockData/mockUsers";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, serCurrentUser] = useState({ id: 1 });

  const [activeModal, setActiveModal] = useState("");

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <div className="app__content">
        <LeftSideBar
          isLoggedIn={isLoggedIn}
          handleLoginClick={handleLoginClick}
          handleLogoutClick={handleLogoutClick}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
