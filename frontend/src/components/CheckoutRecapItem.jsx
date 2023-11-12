import CloseIcon from "../assets/icons/CloseIcon";

const CheckoutRecapItem = ({ id, media, name, price, productQuantity }) => {
  return (
    <>
      <div className="checkoutRecapItem-content">
        {media ? <img src="" alt="" /> : <CloseIcon />}

        <div className="checkoutRecapItem-text">
          <p>{name}</p>
          <p className="subtitle">{price} $</p>
        </div>
      </div>
      <p>{` x ${productQuantity}`}</p>
    </>
  );
};

export default CheckoutRecapItem;
