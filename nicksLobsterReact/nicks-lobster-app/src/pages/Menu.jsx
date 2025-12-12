import "../styles/menu.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

//may need to change for atlas 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Menu() 
{
  const { addToCart } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => 
  {
    async function fetchMenu() 
    {
      try 
      {
        const res = await fetch(`${API_BASE_URL}/menuitems`);
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await res.json();
        setItems(data);
        //if th menu cant be fetched from db throw error
      } catch (err) 
      {
        console.error(err);
        setError("There was a problem loading the menu. Please try again later.");
        //loading is complete
      } finally 
      {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <>
      <Header />
      <h2 className="page-title">Menu</h2>

      {loading && <p className="menu-status">Loading menu...</p>}
      {error && <p className="menu-status error">{error}</p>}

      {/*item display*/}
      <div className="menu-container">
        {!loading &&
          !error &&
          items.map((item) => (
            <div className="menu-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="menu-item-info">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-price">
                  ${Number(item.price).toFixed(2)}
                </p>
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