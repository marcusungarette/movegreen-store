import React from "react";

//strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

//handle user
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user.js";

export default function Login() {
  const history = useHistory();

  //setup user context

  const { userLogin, alert, showAlert } = React.useContext(UserContext);

  // state values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };

  //LOGIN - REGISTER - ALERT

  const handleSubmit = async (e) => {
    showAlert({
      msg: "Acessando os dados, por favor aguarde...",
    });

    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }

    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;

      const newUser = {
        token,
        username,
      };
      userLogin(newUser);

      showAlert({
        msg: `Boas compras ${username} `,
      });

      history.push("/products");
    } else {
      showAlert({
        msg: "Por favor tente novamente",
        type: "danger",
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "Entrar" : "Cadastrar-se"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {isEmpty && (
          <p className="form-empty">Por favor, preencha seus dados.</p>
        )}

        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        )}

        <p className="register-link">
          {isMember ? "Cadastre-se -" : "Ja sou cadastrado"}
          <button type="button" onClick={toggleMember}>
            Clique Aqui
          </button>
        </p>
      </form>
    </section>
  );
}
