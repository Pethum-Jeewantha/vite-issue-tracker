import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import './index.css'
import {Theme} from "@radix-ui/themes";
import {RouterProvider} from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import {router} from "./routes/MainRouter.tsx";

const config = {
    signInRedirectURL: "http://localhost:3000",
    clientID: "RK72cj6GzYq_tzzdgtkn75X6PY8a",
    baseUrl: "https://api.asgardeo.io/t/pethumjeewantha",
    scope: [ "openid","profile" ]
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
        <AuthProvider config={config}>
            <RouterProvider router={router} />
        </AuthProvider>
    </Theme>
  </React.StrictMode>,
)
