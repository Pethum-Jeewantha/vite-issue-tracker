import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import './index.css'
import {Theme} from "@radix-ui/themes";
import {RouterProvider} from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import { Provider } from "react-redux";
import {router} from "./routes/MainRouter.tsx";
import {asgardeoConfigs} from "./config/constant.ts";
import {store} from "./store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="light" accentColor="violet">
        <AuthProvider config={asgardeoConfigs}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </AuthProvider>
    </Theme>
  </React.StrictMode>,
)
