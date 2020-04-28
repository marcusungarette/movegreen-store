import React from "react";
import { Link } from "react-router-dom";

//ls 236-237
export default function EmptyCart() {
  return (
    <section className="empty-cart section">
      <h2>Carrinho Vazio...</h2>
      <Link to="/products" className="btn btn-primary">
        Ver produtos
      </Link>
    </section>
  );
}
