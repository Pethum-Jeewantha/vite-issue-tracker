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
    const {getBasicUserInfo} = useAuthContext();

    function handleSignIn() {
        /*const getClientCredentials = oauth.clientCredentials(
            axios.create(),
            "https://sts.choreo.dev/oauth2/token",
            choreoConfigs.clientID,
            choreoConfigs.clientSecret
        );
        const auth = getClientCredentials("public");
        const accessToken = auth.access_token;
        LocalStorageUtil.setItem('@token', accessToken);*/

        getBasicUserInfo().then((user) => {
            LocalStorageUtil.setItem('user', user);
        });
        /*getIDToken().then((token) => {
            LocalStorageUtil.setItem('@token', token);
        });*/
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
