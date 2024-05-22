import {
  faCar,faHome,faHotel,faUser,faWarehouse
  } from "@fortawesome/free-solid-svg-icons";
  
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import "./footer.css";
  import logo from "../../image/logo kiraa orange.png"
  import { faFacebook, faInstagram, faYoutube, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
  
  
  const Footer = () => {
    return (
      <>
        <div classNameName="bodyc">
  <div classNameName="footerv">
  <div className="footerf">
  <div className="rowx">
  <a id="ico" href="https://www.facebook.com/profile.php?id=61559806083342"><FontAwesomeIcon icon={faFacebook} /></a>
  <a id="ico" href="https://www.instagram.com/kiraa6769/"><FontAwesomeIcon icon={faInstagram} /></a>
  <a id="ico" href="https://www.youtube.com/channel/UC13hsyTCajyu6JZAuOT-AhA"><FontAwesomeIcon icon={faYoutube} /></a>
  <a id="ico" href="https://www.tiktok.com/@kiraa.location?_t=8mW1dpq6M7B&_r=1"><FontAwesomeIcon icon={faTiktok} /></a>
  </div>
  
  <div className="rowx">
  <ul>
  <li><a href="/">nos voitures</a></li>
  <li><a href="/agences">agences</a></li>
  <li><a href="/contact">contact</a></li>
  <li><a href="/about">qui sommes-nous ?</a></li>
  <li><a href="#" style={{ display: "none" }}>Career</a></li>
  </ul>
  </div>
  
  <div className="rowx" style={{  color : "whitesmoke" }}>
  Kiraa Copyright © 2024 Kiraa - All rights reserved 
  </div>
  </div>
  </div>
  </div>
      </>
    );
  };
  
  export default Footer;