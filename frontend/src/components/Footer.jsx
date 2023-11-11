import Nav from "./Nav";
import Facebook from "../assets/icons/Facebook";
import Twitter from "../assets/icons/Twitter";
import Instagram from "../assets/icons/Instagram";

import Logo from "../assets/icons/Logo";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-nav-container">
          <span className="footer_logo">
            <Logo color="#FFF" />
          </span>
          <Nav />
        </div>
        <div className="footer-description">
          <div className="footer-description-text">
            <p>Copyright 2021. All Rights Reserved</p>
          </div>
          <div className="social-medias-container">
            <a href="">
              <Facebook />
            </a>
            <a href="">
              <Twitter />
            </a>
            <a href="">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
