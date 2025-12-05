
export default function Footer() 
{
  return (
    <div className="footerContainer">
      <div className="footer">
        <div className="footerPicture"> {/* picture in footer*/}
          <img src="/images/footerPic (1).png"/>
        </div>

        <div className="footerHeader1"> 
          <h2>Nick’s Lobster</h2>
          <p>Fresh seafood served daily in Brooklyn.</p>
        </div>

        <div className="footerHeader2">
          <h2>Hours</h2>
          <p>Mon–Sun: 11:00 AM – 9:00 PM</p>
        </div>

        <div className="footerHeader3">
          <h2>Contact</h2>
          <p>Phone: (555) 123-4567</p>
          <p>Email: support@nickslobster.com</p>
        </div>
      </div>
    </div>
  );
}