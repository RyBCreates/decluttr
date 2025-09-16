import "./ShopItem.css";

function ShopItem({ items, selectedItemId, setSelectedItemId, setStatus }) {
  return (
    <div className="shop-item">
      {items.map((item) => (
        <button
          key={item.id}
          className={`shop-item__button ${
            selectedItemId === item.id ? "shop-item__button_active" : ""
          }`}
          onClick={() => {
            setSelectedItemId(item.id);
            setStatus("");
          }}
        >
          <span className="shop-item__name">{item.name}</span>
          <span className="shop-item__price">💎 {item.price}</span>
        </button>
      ))}
    </div>
  );
}

export default ShopItem;
