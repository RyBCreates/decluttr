import { useContext, useEffect, useState } from "react";

import StoreMenu from "../../StoreMenu/StoreMenu";

import { getShopItems } from "../../../utils/api/shopItems";

import { CurrentUserContext } from "../../../contexts/UserContext";

import "./Shop.css";

function Shop({ handlePurchaseItem, userItems }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const [shopItems, setShopItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [status, setStatus] = useState("");
  const [initialPurchase, setInitialPurchase] = useState(false);

  // On mount, Load Shop Items from backend
  useEffect(() => {
    async function loadItems() {
      const items = await getShopItems();
      setShopItems(items);

      if (items.length > 0) {
        setSelectedItemId(items[0]._id);
      }
    }

    loadItems();
  }, []);

  const selectedItem = shopItems.find((i) => i._id === selectedItemId);

  const selectedUserItem =
    userItems && selectedItem
      ? userItems.find((ui) => ui.itemId === selectedItem._id)
      : null;

  const quantityOwned = selectedUserItem ? selectedUserItem.quantity : 0;

  // Purchase an item
  const handlePurchase = async () => {
    if (!user || !selectedItem) return;

    try {
      const { userItem, remainingGems } = await handlePurchaseItem(
        selectedItem._id
      );
      setStatus(`Purchased ${selectedItem.name}!`);
      setUser((prev) => ({ ...prev, gems: remainingGems }));
      setInitialPurchase(true);
    } catch (err) {
      console.error(err);
      setStatus("Purchase failed");
    }
  };

  const canAfford = (user?.gems ?? 0) >= (selectedItem?.cost ?? Infinity);

  //  Logic for Boost Multiplier (not working yet)
  //         next.xpBoostUsesLeft =
  //           (prev.xpBoostUsesLeft ?? 0) + (selectedItem.uses ?? 0);
  //         const currentMult = prev.xpBoostMultiplier ?? 1;
  //         const itemMult = selectedItem.multiplier ?? 1;
  //         next.xpBoostMultiplier = Math.max(currentMult, itemMult);
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
            {initialPurchase ? (
              <>
                {selectedItem && (
                  <p className="shop__item-owned">
                    You own: {quantityOwned} {selectedItem.name}
                  </p>
                )}
              </>
            ) : (
              <></>
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
