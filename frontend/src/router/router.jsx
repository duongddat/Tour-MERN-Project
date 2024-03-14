import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage.jsx";
import RootAuthPage from "../pages/RootAuthPage.jsx";
import RootProtect from "../pages/RootProtect.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import TourPage from "../pages/ToursPage/TourPage.jsx";
import DetailPage from "../pages/DetailTourPage/DetailTourPage.jsx";
import BlogPage from "../pages/BlogPage/BlogPage.jsx";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

import { loader as loadData } from "../utils/loadHomeData.js";
import { loader as loadTourData } from "../utils/loadTourData.js";
import { loader as loadTourDetailData } from "../utils/loadTourDetailData.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: loadData },
      {
        path: "tours",
        children: [
          { index: true, element: <TourPage />, loader: loadTourData },
          { path: "search", element: <TourPage />, loader: loadTourData },
          {
            path: "detail/:slug",
            element: <DetailPage />,
            loader: loadTourDetailData,
          },
          {
            path: "country/:slug",
            element: <TourPage />,
            loader: loadTourData,
          },
        ],
      },
      { path: "blog", element: <BlogPage /> },
      { path: "about-us", element: <AboutUsPage /> },
      {
        path: "auth",
        element: <RootProtect />,
        children: [{ path: "user-detail", element: <UserDetailPage /> }],
      },
    ],
  },
  { path: "/home", element: <Navigate to="/" /> },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <LoginPage />
      </RootAuthPage>
    ),
  },
  {
    path: "/register",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <RegisterPage />
      </RootAuthPage>
    ),
  },
]);

export default router;
