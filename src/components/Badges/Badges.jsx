import Badge from "../Badge/Badge";
import "./Badges.css";

function Badges({ badges, userBadges }) {
  // console.log("All badges:", badges);
  // console.log("User badges:", userBadges);

  const unlockedBadges = badges.map((badge) => {
    const userBadge = userBadges.find((ub) => ub.badgeId._id === badge._id);
    return {
      ...badge,
      unlocked: userBadge ? userBadge.unlocked : false,
    };
  });
  return (
    <section className="badges profile__tab">
      <h2 className="badges__title">Here are your Badges!</h2>
      <ul className="badges__gallery">
        {unlockedBadges.map((badge) => (
          <Badge key={badge._id} badge={badge} />
        ))}
      </ul>
    </section>
  );
}

export default Badges;
