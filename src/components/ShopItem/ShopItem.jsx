import "./ShopItem.css";

function ShopItem({
  item,
  selectedItemId,
  setSelectedItemId,
  setStatus,
  shopItemVariant,
  quantity,
}) {
  return (
    <li
      className={`shop-item ${
        selectedItemId === item._id ? "shop-item__active" : ""
      }`}
      onClick={() => {
        setSelectedItemId(item._id);
        setStatus("");
      }}
    >
      <h4 className="shop-item__name">{item.name}</h4>
      {shopItemVariant === "user" ? (
        <>
          {/* Map in User Items */}
          <p>Quantity: {quantity}</p>
        </>
      ) : (
        <>
          {" "}
          <p className="shop-item__price">💎 {item.cost}</p>
        </>
      )}
    </li>
  );
}

export default ShopItem;
