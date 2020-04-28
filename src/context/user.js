// user context -  ls 262 - 263
import React from "react";

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

function UserProvider({ children }) {
  // const [user, setUser] = React.useState({
  //   username: null,
  //   token: null,
  // });

  const [user, setUser] = React.useState(getUserFromLocalStorage());

  // USER LOGIN AND USER LOGOUT

  // send object from - /context/user.js
  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({
      username: null,
      token: null,
    });
    localStorage.removeItem("user");
  };

  // ALERT MESSAGE
  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "sucesso",
  });

  const showAlert = ({ msg, type = "sucesso" }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        showAlert,
        hideAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
