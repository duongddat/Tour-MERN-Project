import { Navigate, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TourPage from "../pages/TourPage";
import RootPage from "../pages/RootPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tours", element: <TourPage /> },
    ],
  },
  { path: "/home", element: <Navigate to="/" /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
