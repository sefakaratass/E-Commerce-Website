import { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, message, getTotalPrice } =
    useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>🛒 Sepet</h2>
      {message && <div className="message">{message}</div>}

      {cartItems.length === 0 ? (
        <p className="empty-cart">Sepetiniz boş</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.priceText}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="total-price">
        <h3>Toplam Fiyat: {getTotalPrice().toFixed(2)}</h3>
      </div>

      {cartItems.length > 0 && (
        <button className="clear-cart-btn" onClick={clearCart}>
          🧹 Sepeti Temizle
        </button>
      )}
    </div>
  );
};

export default Cart;
