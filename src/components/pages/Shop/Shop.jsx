import "./Shop.css";
import { useContext, useState } from "react";

import StoreMenu from "../../StoreMenu/StoreMenu";

import { shopItemsData } from "../../../utils/mockData/mockItems";

import { CurrentUserContext } from "../../../contexts/UserContext";

function Shop() {
  const { user, setUser } = useContext(CurrentUserContext);
  const [shopItems, setShopItem] = useState(shopItemsData);
  const [selectedItemId, setSelectedItemId] = useState(shopItems[0]._id);
  const selectedItem = shopItems.find((i) => i._id === selectedItemId);
  const [status, setStatus] = useState("");

  const canAfford = (user?.gems ?? 0) >= (selectedItem?.cost ?? Infinity);

  const handlePurchase = () => {
    if (!user || !selectedItem || !setUser) return;
    if (!canAfford) {
      setStatus("Not enough gems to purchase.");
      return;
    }

    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, gems: (prev.gems ?? 0) - selectedItem.cost };

      switch (selectedItem._id) {
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
            <p className="shop__item-price">Price: 💎 {selectedItem?.cost}</p>

            {selectedItem?._id === "streak-freeze" && (
              <p className="shop__item-owned">
                You own: {user?.streakFreezes ?? 0} Streak Freeze
                {(user?.streakFreezes ?? 0) === 1 ? "" : "s"}
              </p>
            )}
            {selectedItem?._id === "xp-boost-2x-5" && (
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
      <StoreMenu
        shopItems={shopItems}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        setStatus={setStatus}
      />
    </div>
  );
}

export default Shop;
