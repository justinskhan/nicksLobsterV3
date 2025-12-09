import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);

  // total number of items in cart calculation
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav>
      <div className="myLogo">
        <img src="/images/icon.png" alt="Nick's Lobster Logo" />
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Cart link with badge */}
        <li className="cart-link-wrapper">
          <Link to="/cart">Cart</Link>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}