import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { keycloak } from './Auth';

export default keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
  .then(async (auth) => {

    localStorage.setItem("react-token", keycloak.token);
    let userinfo = {};
    console.log(keycloak);
    if (keycloak.idTokenParsed) {
      userinfo.username = keycloak.idTokenParsed.preferred_username;
      userinfo.userId = keycloak.idTokenParsed.sub;
      userinfo.email = keycloak.idTokenParsed.email;
      userinfo.name = keycloak.idTokenParsed.name;
      userinfo.shortName = keycloak.idTokenParsed.given_name;
      userinfo.idToken=keycloak.idToken;
      localStorage.setItem("user-info", btoa(JSON.stringify(userinfo)));
    }

    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<React.StrictMode>
      <App />
    </React.StrictMode>);

    setTimeout(() => {
      keycloak.updateToken(5).then((refreshed) => {
        if (refreshed) {
          console.debug('Token refreshed' + refreshed);
        } else {
          console.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.error('Failed to refresh token');
      });
    }, 10)

  })
  .catch((e) => {
    console.log("Authenticated Failed", e);
    console.error("Authenticated Failed");
  });
