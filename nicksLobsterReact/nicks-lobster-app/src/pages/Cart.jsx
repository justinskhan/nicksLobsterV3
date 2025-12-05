import "../styles/cart.css";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

export default function Cart() 
{
  const { cart, updateQuantity } = useContext(CartContext); {/* use context made from cartcontext */}
{/* func to calculate total */}
  const total = cart.reduce( 
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleIncrease = (item) => { {/* handles increase of item quantity */}
    updateQuantity(item.id, 1);
    alert(`Added one ${item.name} to the cart.`);
  };

  const handleDecrease = (item) => { {/* handles decrease of item quantity */}
    updateQuantity(item.id, -1);
    alert(`Removed one ${item.name} from the cart.`);
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
                    <span className="quantity-count">{item.quantity || 1}</span>
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
            <p className="cart-total">Total: ${total.toFixed(2)}</p> {/* displays total */}
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
