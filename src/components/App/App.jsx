import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";

import LoginModal from "../modals/LoginModal/LoginModal";
import RegisterModal from "../modals/RegisterModal/RegisterModal";

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
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Close Modals(global)
  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSwitchModal = () => {
    if (activeModal === "register") {
      closeModal();
      setActiveModal("login");
    } else {
      setActiveModal("register");
    }
  };

  return (
    <div className="app">
      <div className="app__content">
        <LeftSideBar
          isLoggedIn={isLoggedIn}
          handleLoginClick={handleLoginClick}
          handleLogoutClick={handleLogoutClick}
          handleRegisterClick={handleRegisterClick}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
        </Routes>
      </div>
      <RegisterModal
        activeModal={activeModal}
        closeModal={closeModal}
        handleSwitchModal={handleSwitchModal}
      />
      <LoginModal
        activeModal={activeModal}
        handleSwitchModal={handleSwitchModal}
      />
    </div>
  );
}

export default App;
