import "../styles/cart.css";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

//same as how it is in the menu.jsx component / may need to change
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3006";

export default function Cart() {
  const { cart, updateQuantity, clearCart } = useContext(CartContext); // use context

  //func to calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleIncrease = (item) => 
  {
    //will activate when the plus sign is clicked
    updateQuantity(item.id, 1);
    alert(`Added one ${item.name} to the cart.`);
  };
  //will activate when the minus sign is clicked
  const handleDecrease = (item) => 
  {
    updateQuantity(item.id, -1);
    alert(`Removed one ${item.name} from the cart.`);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      const orderPayload = 
      {
        items: cart,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
      console.log("Order response:", data);
      //the order has been placed and the cart will be cleared
      alert("Your order has been placed successfully!");
      clearCart(); 
    } catch (err) {
      //error log
      console.error(err);
      alert("There was a problem placing your order. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <section className="cart-page">
        <div className="cart-summary">
          <h2 className="page-title">Your Cart</h2>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => handleDecrease(item)}
                    >
                      −
                    </button>
                    <span className="quantity-count">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="qty-btn"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: ${total.toFixed(2)}</p>

            {/* Place Order button */}
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}