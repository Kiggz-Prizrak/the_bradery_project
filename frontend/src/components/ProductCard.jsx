import React from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../assets/icons/CloseIcon";

const ProductCard = ({ media, name, id }) => {
  return (
    <article className="productCard_container">
      <div className="productCard_media">
        {media ? <image src={media} /> : <CloseIcon />}
      </div>
      <div>
        <h2>{name}</h2>
      </div>
      <Link className="button-blue " to={`product/${id}`}>
        {" "}
        view product
      </Link>
    </article>
  );
};

export default ProductCard;
