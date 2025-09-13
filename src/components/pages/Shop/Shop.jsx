import "./Shop.css";

function Shop() {
  return (
    <div className="shop">
      <div className="shop__content">
        <h2 className="shop__title">Shop</h2>
        <div className="shop__main">
          <p className="shop__username">Profile Name</p>
          <img className="shop__image"></img>
          <p className="shop__gems">Gems: 999</p>
        </div>
      </div>
      <div className="shop__store">
        <h3 className="shop__store-title">Buy Items</h3>
        <div className="shop__store-item"></div>
        <div className="shop__store-item"></div>
        <div className="shop__store-item"></div>
        <div className="shop__store-item"></div>
      </div>
    </div>
  );
}

export default Shop;
