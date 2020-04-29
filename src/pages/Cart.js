import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user"; // ls 268
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, total } = React.useContext(CartContext);
  const { user } = React.useContext(UserContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="cart-items section">
      <h2> Seu carrinho</h2>
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <h2>total : R$ {total}</h2>

      {user.token ? (
        <Link to="/checkout" className="btn btn-primary btn-block">
          Finalizar Pedido
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block">
          Fazer Login
        </Link>
      )}
    </section>
  );
}
