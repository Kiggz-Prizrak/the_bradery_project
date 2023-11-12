import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slice";

import CheckoutRecapItem from "./CheckoutRecapItem";

import ValidIcon from "../assets/icons/ValidIcon";
import { useNavigate } from "react-router-dom";

const CheckoutValidationModal = () => {
  const navigate = useNavigate();

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_content">
          <span>
            <ValidIcon />
          </span>
          <h2>thank you for your order</h2>
          <p>You will receive an email confirmation shortly.</p>

          <button
          className="button-blue"
            onClick={() => {
              navigate("/");
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
