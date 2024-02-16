import React from "react";
import {SecureRoute, useAuthContext} from "@asgardeo/auth-react";
import MainLayout from "../layout/MainLayout.tsx";

interface AuthGuardProps {
  path: string;
  component: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ path, component }) => {
  const { signIn } = useAuthContext();

  return (
      <SecureRoute
          path={path}
          component={ <MainLayout>{component}</MainLayout> }
          callback={ () => signIn()}
      />
  )
};

export default AuthGuard;
