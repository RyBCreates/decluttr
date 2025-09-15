import "./Shop.css";
import { useContext, useMemo, useState } from "react";
import { CurrentUserContext } from "../../../contexts/UserContext";

function Shop() {
  const { user, setUser } = useContext(CurrentUserContext);

  const items = useMemo(
    () => [
      {
        id: "streak-freeze",
        name: "Streak Freeze",
        price: 100,
        description: "Keep your login streak going even if you miss a day!",
        uses: 1,
      },
      {
        id: "xp-boost-2x-5",
        name: "XP Boost x2 (5 tasks)",
        price: 200,
        description:
          "Double XP for your next 5 tasks that award gems. Each completed task consumes 1 use.",
        multiplier: 2,
        uses: 5,
      },
    ],
    []
  );

  const [selectedItemId, setSelectedItemId] = useState(items[0].id);
  const selectedItem = items.find((i) => i.id === selectedItemId);
  const [status, setStatus] = useState("");

  const canAfford = (user?.gems ?? 0) >= (selectedItem?.price ?? Infinity);

  const handlePurchase = () => {
    if (!user || !selectedItem || !setUser) return;
    if (!canAfford) {
      setStatus("Not enough gems to purchase.");
      return;
    }

    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, gems: (prev.gems ?? 0) - selectedItem.price };

      switch (selectedItem.id) {
        case "streak-freeze": {
          next.streakFreezes =
            (prev.streakFreezes ?? 0) + (selectedItem.uses ?? 1);
          break;
        }
        case "xp-boost-2x-5": {
          next.xpBoostUsesLeft =
            (prev.xpBoostUsesLeft ?? 0) + (selectedItem.uses ?? 0);
          const currentMult = prev.xpBoostMultiplier ?? 1;
          const itemMult = selectedItem.multiplier ?? 1;
          next.xpBoostMultiplier = Math.max(currentMult, itemMult);
          break;
        }
        default:
          break;
      }

      return next;
    });

    setStatus(`Purchased ${selectedItem.name}!`);
  };

  return (
    <div className="shop">
      <div className="shop__content">
        <h2 className="shop__title">Shop</h2>

        <div className="shop__main">
          <p className="shop__username">{user?.username ?? "Guest"}</p>

          <div className="shop__detail">
            <h3 className="shop__item-title">{selectedItem?.name}</h3>
            <p className="shop__item-description">
              {selectedItem?.description}
            </p>
            <p className="shop__item-price">Price: 💎 {selectedItem?.price}</p>

            {selectedItem?.id === "streak-freeze" && (
              <p className="shop__item-owned">
                You own: {user?.streakFreezes ?? 0} Streak Freeze
                {(user?.streakFreezes ?? 0) === 1 ? "" : "s"}
              </p>
            )}
            {selectedItem?.id === "xp-boost-2x-5" && (
              <p className="shop__item-owned">
                Active XP Multiplier: x{user?.xpBoostMultiplier ?? 1} • Uses
                left: {user?.xpBoostUsesLeft ?? 0}
              </p>
            )}

            <button
              className="shop__buy-button"
              onClick={handlePurchase}
              disabled={!canAfford || !user}
              title={!user ? "Please log in to purchase" : undefined}
            >
              {canAfford ? "Purchase" : "Not enough gems"}
            </button>
            {status && <p className="shop__status">{status}</p>}
          </div>

          <p className="shop__gems">Gems: {user?.gems ?? 0}</p>
        </div>
      </div>

      <div className="shop__store">
        <h3 className="shop__store-title">Buy Items</h3>
        {items.map((item) => (
          <button
            key={item.id}
            className={`shop__store-item ${
              selectedItemId === item.id ? "shop__store-item_active" : ""
            }`}
            onClick={() => {
              setSelectedItemId(item.id);
              setStatus("");
            }}
          >
            <span className="shop__store-item-name">{item.name}</span>
            <span className="shop__store-item-price">💎 {item.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Shop;

// TODO:
// Make ShopItem component
// Make StoreMenu component
// Connect Items to mockData or Database
