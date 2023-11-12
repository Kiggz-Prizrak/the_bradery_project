import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slice";

import CheckoutRecapItem from "./CheckoutRecapItem";

import ValidIcon from "../assets/icons/ValidIcon";
import { useNavigate } from "react-router-dom";

const CheckoutValidationModal = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.productQuantity,
    0
  );
  const cartItem = cart[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="checkoutValidationModal-background">
      <div className="checkoutValidationModal-container">
        <div className="checkoutValidationModal-content">
          <span>
            <ValidIcon />
          </span>
          <h2>thank you for your order</h2>
          <p>You will receive an email confirmation shortly.</p>
          <div className="checkoutRecapItem-card-container">
            <div className="checkoutRecapItem-card-content">
              <div className="checkoutRecapItem-container">
                <CheckoutRecapItem
                  id={cartItem.id}
                  image={cartItem.image}
                  name={cartItem.name}
                  price={cartItem.price}
                  productQuantity={cartItem.productQuantity}
                  link={`product-${cartItem.slug}`}
                />
              </div>
              {cart.length > 1 ? (
                <span>
                  <p>{`and ${cart.length - 1} other item(s)`}</p>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="checkoutValidationModal-total-section">
              <p>GRAND TOTAL</p>
              <h6>$ {totalPrice + 50}</h6>
            </div>
          </div>
     
          <button
            onClick={() => {
              navigate("/");
              dispatch(clearCart());
            }}
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutValidationModal;
