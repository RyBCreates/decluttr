import cleanSweep from "../../assets/badges/clean-sweep.jpeg";
import "./Badge.css";

function Badge() {
  return (
    <li className="badge">
      <img
        className="badge__image"
        src={cleanSweep}
        alt="clean sweep badge"
      ></img>
      <h3 className="badge__name">Clean Sweep</h3>
    </li>
  );
}

export default Badge;
