import React from "react";
import { Link } from "react-router-dom";

export default function Product({ image, title, id, price }) {
  const url = image.url; // ls 232 - 253(refactored)
  return (
    <article className="product">
      <div className="img-container">
        <img src={url} alt={title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          Detalhes
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title}</p>
        <p className="product-price">R$ {price}</p>
      </div>
    </article>
  );
}
