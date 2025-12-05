import "../styles/contact.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() 
{
  return (
    <>
      <Header />
      <section className="aboutSection">
        <div className="about-content">
          <h1>Contact</h1>
          <p>
            We love feedback!<br /> Reach out to us at (718) 253-7117<br />
            Get reservations at resy.com
          </p>

          <h1>Location</h1>
          <p>2777 Flatbush Ave Brooklyn, NY 11234</p>
          <img src="/images/NicksLobsterLocation.png" alt="Nick's Lobster Location" />
        </div>
      </section>
      <Footer />
    </>
  );
}