import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() 
{
  return (
    <>
      <Header />
      <section id="Front" className="home-section">
        <div className="myMain">
          <div className="heroImg">
            <img src="/images/hero.jpg" alt="Hero" />
          </div>
          {/* should be in front of the image to the left */}
          <div className="heroText">
            <h1>
              Nick's Lobster House
              <br />Serving Brooklyn
              <br />Fresh Seafood
              <br />Since 1955
            </h1>
            <div className="orderNow">
              <Link to="/menu">Order Now</Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />

    </>
  );
}