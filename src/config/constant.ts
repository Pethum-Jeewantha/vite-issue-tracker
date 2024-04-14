import {envVariables} from "../lib/http.lib.ts";

export const asgardeoConfigs =  {
    signInRedirectURL: `${envVariables.url}/dashboard`,
    clientID: envVariables.asgardeoClientId,
    baseUrl: "https://api.asgardeo.io/t/pethumjeewantha",
    scope: [ "openid","profile" ]
}
