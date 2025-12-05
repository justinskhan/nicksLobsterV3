import "../styles/menu.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Menu() 
{
  const { addToCart } = useContext(CartContext);

  const items = [
    { id: 1, name: "Lobster Roll", price: 42, image: "images/lobsterRoll.webp" },
    { id: 2, name: "Lobster Tail", price: 50, image: "images/lobsterTail.webp" },
    { id: 3, name: "Fried Calamari", price: 20, image: "images/friedCalamari.avif" },
    { id: 4, name: "Mussels", price: 22, image: "images/mussels.avif" },
    { id: 5, name: "Clams Oreganata", price: 30, image: "images/clamsOreganata.jpeg" },
    { id: 6, name: "Grilled Branzino", price: 38, image: "images/grilledBranzino.jpg" },
    { id: 7, name: "Stuffed Shrimp", price: 44, image: "images/stuffedShrimp.jpg" },
    { id: 8, name: "NY Strip Steak", price: 40, image: "images/steak.avif" },
    { id: 9, name: "Surf and Turf", price: 96, image: "images/surfTurf.avif" }
  ];

  return (
    <>
      <Header />
      <h2 className="page-title">Menu</h2>
      {/* display for items */}
      <div className="menu-container">
        {items.map((item) => (
          <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="menu-item-info">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-price">${item.price.toFixed(2)}</p>
            </div>
            <button
              className="add-to-cart"
              onClick={() => {
                addToCart({ ...item, quantity: 1 });
                alert(`${item.name} has been added to cart!`);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
