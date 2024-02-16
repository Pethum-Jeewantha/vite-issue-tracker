import React from "react";
import {SecureApp} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";

interface AuthGuardProps {
    component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({component}) => {
    return (
        <SecureApp>
            <MainLayout>{component}</MainLayout>
        </SecureApp>
    )
};

export default AuthGuard;
