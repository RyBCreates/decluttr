import Badge from "../Badge/Badge";
import "./Badges.css";

function Badges({ badges }) {
  return (
    <section className="badges profile__tab">
      <h2 className="badges__title">Here are your Badges!</h2>
      <ul className="badges__gallery">
        {badges
          // Implement userBadges in backend First
          // .filter((badge) => badge)
          .map((badge) => (
            <Badge key={badge._id} badge={badge} />
          ))}
      </ul>
    </section>
  );
}

export default Badges;
