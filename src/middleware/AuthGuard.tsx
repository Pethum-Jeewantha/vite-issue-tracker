import React from "react";
import {SecureApp, useAuthContext} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";
import NavBar from "../components/layout/NavBar.tsx";
import PageSpinner from "../components/layout/PageSpinner.tsx";
import LocalStorageUtil from "../lib/localStorage.lib.ts";
// import oauth from "axios-oauth-client";
// import axios from "axios";
// import {choreoConfigs} from "../config/constant.ts";

interface AuthGuardProps {
    component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({component}) => {
    const {getBasicUserInfo, getAccessToken} = useAuthContext();

    async function handleSignIn() {
        // const getClientCredentials = oauth.clientCredentials(
        //     axios.create(),
        //     "https://sts.choreo.dev/oauth2/token",
        //     choreoConfigs.clientID,
        //     choreoConfigs.clientSecret
        // );
        // const auth = getClientCredentials("public");
        // const accessToken = auth.access_token;
        // LocalStorageUtil.setItem('@token', accessToken);

        const user = await getBasicUserInfo();
        LocalStorageUtil.setItem('user', user);

        const token = await getAccessToken()
        LocalStorageUtil.setItem('@token', token);
        console.log("Token: ", token)
    }

    return (
        <SecureApp fallback={<PageSpinner/>} onSignIn={handleSignIn}>
            <NavBar />
            <MainLayout>
                {component}
            </MainLayout>
        </SecureApp>
    )
};

export default AuthGuard;
