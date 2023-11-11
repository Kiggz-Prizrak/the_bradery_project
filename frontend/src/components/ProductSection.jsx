import { useState } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../store/slice";

import ButtonQuantity from ".//ButtonQuantity";
import CloseIcon from "../assets/icons/CloseIcon";

const ProductSection = ({ price, name, media, id}) => {
  const [articleQuantity, setArticleQuantity] = useState(0);
  const [errorQuantity, setErrorQuantity] = useState("");
  const dispatch = useDispatch();

  return (
    <section className="productSection_container">
      <div className="productSection_media">
        {media ? <img src="" alt="" /> : <CloseIcon />}
      </div>
      <div className="articleDescription-content">
        <h2>{name}</h2>
        <p>Product description</p>
        <h6>{price} $</h6>
        <div className="button-container">
          <ButtonQuantity
            articleQuantity={articleQuantity}
            setArticleQuantity={setArticleQuantity}
          />

          <button
            className="button-blue"
            onClick={() => {
              if (articleQuantity > 0) {
                setErrorQuantity("");
                dispatch(
                  addToCart({
                    price,
                    name,
                    productQuantity: articleQuantity,
                    id,
                  })
                );
              } else {
                setErrorQuantity("veuillez sélectionner une quantité");
              }
            }}
          >
            add to cart
          </button>
        </div>
        <p>{errorQuantity}</p>
      </div>
    </section>
  );
};

export default ProductSection;
