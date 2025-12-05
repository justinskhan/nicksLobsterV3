import "../styles/about.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() 
{
  return (
    <>
      <Header /> {/* simple text for about section*/}
      <section className="about-section">
        <div className="about-content">
          <h1>About Nick's Lobster House</h1>
          <p>
            Nick's Lobster House is a family-owned company that embodies the spirit of warmth, hospitality, and quality.
            Established in 1955 by fisherman and owner, “Big Nick”, Nick's began with a single lobster shack along Flatbush Avenue where Big Nick would sell
            lobsters right off his boat to passersby. In the mid-seventies, his children decided it would be a good idea to add a full-fledged fish market to
            service the surrounding neighborhoods' growing need for quality seafood.
          </p>

          <p>
            They also opened up a small side kitchen and fish market where they could fry sole and shrimp for hungry customers who weren't in the mood for
            steamed lobsters...which was always a struggle to choose between! By 1983, word had spread quickly so they added an oyster bar where you are now able
            to enjoy fresh clams & oysters!
          </p>

          <p>
            Fast forward a few decades and you now can find our Historic Seafood restaurant in the heart of South Brooklyn. Our space features multiple dining rooms,
            including an outdoor deck that all faces the Mill Basin waterfront, and is still owned by the same family that decided to sell lobsters on Flatbush Ave over
            60 years ago. Nick's Lobster House is now run by General Manager and Executive Chef Dimitrios Karousis.
          </p>
          {/* meant to go under text*/}
          <img src="/images/outside.webp" alt="Nick's Lobster exterior" />
        </div>
      </section>
      <Footer />
    </>
  );
}