import Plus from "../assets/icons/Plus";
import Less from "../assets/icons/Less";
import CloseIcon from "../assets/icons/CloseIcon";

import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../store/slice";

const CartItem = ({ id, name, price, productQuantity, media }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="cartItem_removeButton"
        onClick={() => dispatch(removeItem(id))}
      >
       X
      </button>
      <div className="cartItem_media">
        {media ? <img src="" alt="" /> : <CloseIcon />}
      </div>

      <div className="cartItem_text">
        <p>{name}</p>
        <p className="subtitle">{price} $</p>
      </div>
      <div className="buttonQuantity_container">
        <button
          onClick={() => {
            if (productQuantity > 1) {
              dispatch(decrementQuantity(id));
            }
          }}
        >
          <Less />
        </button>
        <h6>{productQuantity}</h6>

        <button
          className="more"
          onClick={() => dispatch(incrementQuantity(id))}
        >
          <Plus />
        </button>
      </div>
    </>
  );
};

export default CartItem;
