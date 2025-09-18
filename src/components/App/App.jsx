import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Shop from "../pages/Shop/Shop";
import Quiz from "../pages/Quiz/Quiz";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";

import LoginModal from "../modals/LoginModal/LoginModal";
import RegisterModal from "../modals/RegisterModal/RegisterModal";
import AddTaskModal from "../modals/AddTaskModal/AddTaskModal.jsx";

import { getAchievements } from "../../utils/api/achievements";
import { getUserAchievements } from "../../utils/api/userAchievements.js";
import { getBadges } from "../../utils/api/badges";
import { getUserBadges, unlockBadge } from "../../utils/api/userBadges.js";
import { getTasks } from "../../utils/api/tasks";
import { getCurrentUser } from "../../utils/api/auth.js";
import { getShopItems } from "../../utils/api/shopItems.js";

import { CurrentUserContext } from "../../contexts/UserContext";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [userAchievements, setUserAchievements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [badges, setBadges] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
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

  // Load User using jwt token
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    }
    loadUser();
  }, []);

  // Load ALL achievements
  useEffect(() => {
    async function loadAchievements() {
      const data = await getAchievements();
      setAchievements(data);
    }
    loadAchievements();
  }, []);

  // Load User Achievements if Logged In
  useEffect(() => {
    if (isLoggedIn) {
      async function loadUserAchievements() {
        const data = await getUserAchievements();
        setUserAchievements(data);
      }
      loadUserAchievements();
    }
  }, [isLoggedIn]);

  // Load ALL badges
  useEffect(() => {
    async function loadBadges() {
      const data = await getBadges();
      setBadges(data);
    }
    loadBadges();
  }, []);

  // Load User Badges if Logged in
  useEffect(() => {
    if (isLoggedIn) {
      async function loadUserBadges() {
        try {
          const data = await getUserBadges();
          setUserBadges(data);
        } catch (err) {
          console.error("Failed to fetch User Badges", err);
        }
      }
      loadUserBadges();
    }
  }, []);

  const handleUnlockBadge = async (badgeId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { badge } = await unlockBadge(badgeId, token);
      setUserBadges((prev) =>
        prev.map((b) => (b._id === badge._id ? badge : b))
      );
    } catch (err) {
      console.error("Error unlocking badge:", err);
    }
  };

  // Load ALL tasks
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load Tasks", err);
        setTasks([]);
      }
    }
    loadTasks();
  }, []);

  //Load All items
  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getShopItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to load items", err);
        setItems([]);
      }
    }
    loadItems();
  }, []);

  const handleAddTask = (newTask) => {
    const newId = crypto.randomUUID();
    const taskWithId = {
      ...newTask,
      _id: newId,
      completed: false,
      reward: { gems: newTask.reward.gems ?? 0, xp: newTask.reward.xp ?? 5 },
    };
    setTasks((prev) => [taskWithId, ...prev]);

    closeModal();
  };

  return (
    <CurrentUserContext.Provider
      value={{ user: currentUser, setUser: setCurrentUser }}
    >
      <div className="app">
        {isLoggedIn ? (
          <div className="app__content">
            <LeftSideBar handleLogoutClick={handleLogoutClick} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    setActiveModal={setActiveModal}
                    tasks={tasks}
                    setTasks={setTasks}
                    achievements={achievements}
                    userAchievements={userAchievements}
                    setUserAchievements={setUserAchievements}
                    handleUnlockBadge={handleUnlockBadge}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <Profile
                    achievements={achievements}
                    badges={badges}
                    userBadges={userBadges}
                    userAchievements={userAchievements}
                    items={items}
                  />
                }
              />
              <Route path="shop" element={<Shop />} />
              <Route
                path="quiz"
                element={
                  <Quiz
                    achievements={achievements}
                    userAchievements={userAchievements}
                  />
                }
              />
            </Routes>
          </div>
        ) : (
          <div className="app__landing">
            <LandingPage
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
          </div>
        )}

        <RegisterModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
          setIsLoggedIn={setIsLoggedIn}
        />
        <LoginModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleSwitchModal={handleSwitchModal}
          setCurrentUser={setCurrentUser}
          setIsLoggedIn={setIsLoggedIn}
        />
        <AddTaskModal
          activeModal={activeModal}
          closeModal={closeModal}
          onAddTask={handleAddTask}
          tasks={tasks}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
