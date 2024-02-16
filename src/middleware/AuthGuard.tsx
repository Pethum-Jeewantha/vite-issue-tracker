import React from "react";
import {SecureApp} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";
import NavBar from "../components/layout/NavBar.tsx";
import PageSpinner from "../components/layout/PageSpinner.tsx";

interface AuthGuardProps {
    component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({component}) => {
    return (
        <SecureApp fallback={<PageSpinner/>}>
            <NavBar />
            <MainLayout>
                {component}
            </MainLayout>
        </SecureApp>
    )
};

export default AuthGuard;
