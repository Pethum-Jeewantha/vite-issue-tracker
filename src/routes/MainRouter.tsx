import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard.tsx";
import AuthGuard from "../middleware/AuthGuard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard component={ <Dashboard /> }/>,
  },
  {
    path: "/dashboard",
    element: <AuthGuard component={ <Dashboard /> }/>,
  },
]);
