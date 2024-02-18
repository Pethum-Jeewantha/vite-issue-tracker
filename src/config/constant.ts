import {envVariables} from "../lib/http.lib.ts";

export const asgardeoConfigs =  {
    signInRedirectURL: `${envVariables.url}/dashboard`,
    clientID: "3Pk_2oQLDK6OmS11tXD3OlNxKpka",
    baseUrl: "https://api.asgardeo.io/t/pethumjeewantha",
    scope: [ "openid","profile" ]
}
