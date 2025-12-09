import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // total number of items in cart calculation
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleLinkClick = () => {
    // close mobile menu when a link is clicked
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav>
      <div className="myLogo">
        <img src="/images/icon.png" alt="Nick's Lobster Logo" />
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((s) => !s)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>

        {/* Cart link with badge */}
        <li className="cart-link-wrapper">
          <Link to="/cart" onClick={handleLinkClick}>Cart</Link>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}