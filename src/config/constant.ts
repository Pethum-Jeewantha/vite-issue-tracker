import {envVariables} from "../lib/http.lib.ts";

export const asgardeoConfigs =  {
    signInRedirectURL: `${envVariables.url}/dashboard`,
    clientID: envVariables.asgardeoClientId,
    baseUrl: "https://api.asgardeo.io/t/pethumjeewantha",
    scope: [ "openid","profile" ]
}

export const choreoConfigs = {
    clientID: import.meta.env.CHOREO_CLIENT_ID,
    clientSecret: import.meta.env.CHOREO_CLIENT_SECRET
}
