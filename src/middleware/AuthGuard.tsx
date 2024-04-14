import React from "react";
import {SecureApp, useAuthContext} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";
import NavBar from "../components/layout/NavBar.tsx";
import PageSpinner from "../components/layout/PageSpinner.tsx";
import LocalStorageUtil from "../lib/localStorage.lib.ts";

interface AuthGuardProps {
    component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({component}) => {
    const {getBasicUserInfo, getAccessToken} = useAuthContext();

    async function handleSignIn() {
        const user = await getBasicUserInfo();
        LocalStorageUtil.setItem('user', user);

        const token = await getAccessToken()
        LocalStorageUtil.setItem('@token', token);
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
