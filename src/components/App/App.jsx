import Home from "../pages/Home/Home";
import SideBar from "../LeftSideBar/LeftSideBar";
import "./App.css";
import RightSideBar from "../RightSideBar/RightSideBar";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <SideBar />
        <Home />
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;
