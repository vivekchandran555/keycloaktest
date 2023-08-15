import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'http://192.168.0.119:8080',
    realm: 'test',
    clientId: 'keycloaktest'
}

export const keycloak = new Keycloak(initOptions);