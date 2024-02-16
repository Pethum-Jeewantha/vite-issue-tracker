import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard.tsx";
import AuthGuard from "../middleware/AuthGuard.tsx";

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
