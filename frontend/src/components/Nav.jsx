import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const Nav = ({ setNavIsOpen, navIsOpen }) => {

   const isLoged = useSelector((state) => state.userData.isLoged);
  return (
    <nav className={navIsOpen ? "nav_open" : "nav_closed"}>
      <NavLink to="/" className="home-link" onClick={() => setNavIsOpen(false)}>
        Home
      </NavLink>
      <a href="">Women</a>
      <a href="">Man</a>
      <a href="">Promotions</a>
      <NavLink
        to={isLoged ? "/account" : "/login"}
        className="home-link"
        onClick={() => setNavIsOpen(false)}
      >
        Acount
      </NavLink>
    </nav>
  );
};

export default Nav;
