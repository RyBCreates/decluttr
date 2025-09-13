import "./Badge.css";

function Badge({ badge }) {
  return (
    <li className="badge">
      <img
        className="badge__image"
        src={badge.image}
        alt="clean sweep badge"
      ></img>
      <h3 className="badge__name">{badge.name}</h3>
    </li>
  );
}

export default Badge;
