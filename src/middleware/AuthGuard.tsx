import React from "react";
import {SecureApp} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";
import NavBar from "../components/layout/NavBar.tsx";

interface AuthGuardProps {
    component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({component}) => {
    return (
        <SecureApp>
            <NavBar />
            <MainLayout>
                {component}
            </MainLayout>
        </SecureApp>
    )
};

export default AuthGuard;
