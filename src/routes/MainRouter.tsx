import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../middleware/AuthGuard.tsx";
import Dashboard from "../pages/Dashboard.tsx";

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
