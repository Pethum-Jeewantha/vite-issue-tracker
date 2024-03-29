import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthGuard from "../middleware/AuthGuard.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import IssuePage from "../pages/issues/list";
import NewIssuePage from "../pages/issues/new";
import IssueDetailPage from "../pages/issues/view";
import EditIssuePage from "../pages/issues/edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard component={ <Dashboard /> }/>,
  },
  {
    path: "/issues/list",
    element: <AuthGuard component={ <IssuePage /> }/>,
  },
  {
    path: "/issues/new",
    element: <AuthGuard component={ <NewIssuePage /> }/>,
  },
  {
    path: "/issues/:id",
    element: <AuthGuard component={ <IssueDetailPage /> }/>,
  },
  {
    path: "/issues/edit/:id",
    element: <AuthGuard component={ <EditIssuePage/> }/>,
  },
]);
