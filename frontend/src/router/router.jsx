import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage";
import HomePage from "../pages/HomePage";
import TourPage from "../pages/TourPage";
import BlogPage from "../pages/BlogPage";
import AboutUsPage from "../pages/AboutUsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import { loader as loadTour } from "../utils/loadTour";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage />, loader: loadTour },
      { path: "tours", element: <TourPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "about-us", element: <AboutUsPage /> },
    ],
  },
  { path: "/home", element: <Navigate to="/" /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
