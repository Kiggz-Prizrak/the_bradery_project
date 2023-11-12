import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

import { clearCart } from "../store/slice";

const CartModal = ({ setCartIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.productQuantity,
    0
  );

  return (
    <div className="cartModal_background">
      <div className="cartModal_layout">
        <div className="cartModal_container">
          {cart.length ? (
            <>
              <div className="cart_header">
                <h5>CART ({cart.length})</h5>
                <button onClick={() => dispatch(clearCart())}>
                  <p>Remove all</p>
                </button>
              </div>
              <ul>
                {cart.map((e) => {
                  return (
                    <li key={e.id} className="cartItem_container">
                      <CartItem
                        id={e.id}
                        name={e.name}
                        price={e.price}
                        productQuantity={e.productQuantity}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className="cart_footer">
                <p>TOTAL</p>
                <h6>{totalPrice} $</h6>
              </div>
              <button
                className="button-blue"
                onClick={() => {
                  setCartIsOpen(false);
                  navigate(`/checkout`);
                }}
              >
                checkout
              </button>
            </>
          ) : (
            <p>Votre panier est vide</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
