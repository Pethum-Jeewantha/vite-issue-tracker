import {envVariables} from "../lib/http.lib.ts";

export const asgardeoConfigs =  {
    signInRedirectURL: `${envVariables.url}`,
    clientID: envVariables.asgardeoClientId,
    baseUrl: "https://api.asgardeo.io/t/pethumjeewantha",
    scope: [ "openid","profile" ]
}

export const choreoConfigs = {
    clientID: import.meta.env.VITE_CHOREO_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CHOREO_CLIENT_SECRET
}
