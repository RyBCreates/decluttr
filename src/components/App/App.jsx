import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";
import Quiz from "../pages/Quiz/Quiz";

import LoginModal from "../modals/LoginModal/LoginModal";
import RegisterModal from "../modals/RegisterModal/RegisterModal";

import { users } from "../../utils/mockData/mockUsers";
import { CurrentUserContext } from "../../contexts/UserContext";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(users[2]);

  const [activeModal, setActiveModal] = useState("");
  const [achievementVariant, setAchievementVariant] = useState("");

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
    <CurrentUserContext.Provider
      value={{ user: currentUser, setUser: setCurrentUser }}
    >
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
            <Route path="quiz" element={<Quiz />} />
          </Routes>
        </div>
        <RegisterModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
        />
        <LoginModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
          setCurrentUser={setCurrentUser}
          setIsLoggedIn={setIsLoggedIn}
          users={users}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
