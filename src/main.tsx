import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import './index.css'
import {Theme} from "@radix-ui/themes";
import {RouterProvider} from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import {router} from "./routes/MainRouter.tsx";
import {asgardeoConfigs} from "./config/constant.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="light" accentColor="violet">
        <AuthProvider config={asgardeoConfigs}>
            <RouterProvider router={router} />
        </AuthProvider>
    </Theme>
  </React.StrictMode>,
)
