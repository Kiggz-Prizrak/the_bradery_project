import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Logo from "../assets/icons/Logo";
import Cart from "../assets/icons/Cart";
import Burger from "../assets/icons/Burger";
import CloseIcon from "../assets/icons/CloseIcon";

import Nav from "./Nav";
import CartModal from "./CartModal";

const Header = () => {
  const cart = useSelector((state) => state.cart) ;
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <>
      <header>
        <div className="header_container">
          <div className="nav_button_container">
            <button
              className={
                navIsOpen ? "nav_button_invisible" : "nav_button_visible"
              }
              onClick={() => setNavIsOpen(true)}
            >
              <Burger />
            </button>
            <button
              className={
                navIsOpen ? "nav_button_visible" : "nav_button_invisible"
              }
              onClick={() => setNavIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <span className="header_logo">
            <Logo color="#203059" />
          </span>
          <Nav setNavIsOpen={setNavIsOpen} navIsOpen={navIsOpen} />
          <div>
            
            <button
              className="cart_button"
              onClick={() => setCartIsOpen(!cartIsOpen)}
            >
              {cart.length ? (
                <span className="cart-quantity-label">{cart.length}</span>
              ) : (
                ""
              )}

              <Cart />
            </button>
          </div>
        </div>
      </header>
      {cartIsOpen ? <CartModal setCartIsOpen={setCartIsOpen} /> : ""}
    </>
  );
};
export default Header;
