import { NavLink } from "react-router-dom";

const Nav = ({ setNavIsOpen, navIsOpen }) => {
  return (
    <nav className={navIsOpen ? "nav_open" : "nav_closed"}>
      <a href="">Women</a>
      <a href="">Man</a>
      <a href="">Promotions</a>
      <a href="">Promotions</a>
      <NavLink to="/" className="home-link" onClick={() => setNavIsOpen(false)}>
        Acount
      </NavLink>
    </nav>
  );
};

export default Nav;
