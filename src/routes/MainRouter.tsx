import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthGuard from "../middleware/AuthGuard.tsx";
import Dashboard from "../pages/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard component={ <Dashboard /> }/>,
  },
]);
