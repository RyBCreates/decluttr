import Badge from "../Badge/Badge";
import "./Badges.css";

function Badges() {
  return (
    <section className="badges profile__tab">
      <h2 className="badges__title">Here are your Badges!</h2>
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
