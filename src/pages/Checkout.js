import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";
import submitOrder from "../strapi/submitOrder";

//ls 270 - 271 - 274 - 277 - 278

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);

  const { user, showAlert, hideAlert, alert } = React.useContext(UserContext);

  const history = useHistory();
  // state values
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const isEmpty = !name || alert.show;
  async function handleSubmit(e) {
    showAlert({ msg: "Enviando pedido...por favor aguarde" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));

    const { token } = response;
    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      if (order) {
        showAlert({ msg: "Seu pedido foi feito com sucesso" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg:
            "Aconteceu um erro com o seu pedido, por favor tente mais tarde!",
          type: "danger",
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.lenght < 1) return <EmptyCart />;
  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>
          Total do Pedido : <span>R${total}</span>
        </h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="cartd-element">Cartão de crédito ou débito</label>
          <p className="stripe-info">
            Teste usando esse Cartão de crédito :
            <span> 4242 4242 4242 4242</span> <br></br>
            Coloque seu CEP com 5 dígitos <br></br>
            Coloque o CVC do seu Cartão de crédito
          </p>
        </div>
        {/* end of card element */}
        {/* Stripe Elements */}
        <CardElement className="card-element"></CardElement>
        {/* Stripe Errors */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">Por favor, preencha seu Nome</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            Enviar
          </button>
        )}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_s5lBUP3IlDvT3ZaWWJ24fnTr00618jqQqP">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
