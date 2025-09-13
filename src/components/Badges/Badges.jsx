import Badge from "../Badge/Badge";
import "./Badges.css";

function Badges() {
  return (
    <section className="badges profile__tab">
      <h2 className="badges__text">Here are your badges!</h2>
      <ul className="badges__gallery">
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </ul>
    </section>
  );
}

export default Badges;
