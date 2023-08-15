import React from "react";
import { keycloak } from "./Auth";

function App() {
  const LogOut = async () => {
    try {
      const userInfo = window.atob(localStorage.getItem("user-info"));
      let userParsed = JSON.parse(userInfo);
      console.log(userParsed);
      const localKeys = Object.keys(localStorage)
      localKeys.map(s => localStorage.removeItem(s))
      sessionStorage.clear();
      keycloak.logout();
      // window.open(
      //   `http://192.168.0.119:8080/realms/test/protocol/openid-connect/logout?client_id=keycloaktest&post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&id_token_hint=${userParsed.idToken}`,
      //   "_self"
      // );
    } catch (error) {
      localStorage.removeItem("react-token");
      localStorage.removeItem("user-info");
      localStorage.removeItem('shell.auth');
      sessionStorage.clear()
    }

  };

  return (
    <div>
      <h1>hi</h1>
      <button onClick={LogOut}>LogOut</button>
    </div>
  );
}

export default App;