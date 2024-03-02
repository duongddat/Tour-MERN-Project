import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage";
import HomePage from "../pages/HomePage/HomePage.jsx";
import TourPage from "../pages/ToursPage/TourPage.jsx";
import BlogPage from "../pages/BlogPage/BlogPage.jsx";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";

// import { loader as loadTour } from "../utils/loadTour";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage /> },
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
