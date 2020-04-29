import React from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";

export default function LoginLink() {
  const { user, userLogout } = React.useContext(UserContext);
  const { clearCart } = React.useContext(CartContext);
  const history = useHistory();

  if (user.token) {
    return (
      <button
        className="login-btn"
        onClick={() => {
          userLogout();
          clearCart();
          history.push("/");
        }}
      >
        Logout
      </button>
    );
  }

  return <Link to="/login">Entrar</Link>;
}
