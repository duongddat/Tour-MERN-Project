import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage.jsx";
import RootAuthPage from "../pages/RootAuthPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import TourPage from "../pages/ToursPage/TourPage.jsx";
import DetailPage from "../pages/DetailTourPage/DetailTourPage.jsx";
import BlogPage from "../pages/BlogPage/BlogPage.jsx";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";
import OTPPage from "../pages/ForgotPassword/OTPPage.jsx";
import ResetPassword from "../pages/ForgotPassword/ResetPassword.jsx";
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage.jsx";
import UserUpdateInfo from "../pages/UserDetailPage/UserUpdateInfor.jsx";
import UserChangePassword from "../pages/UserDetailPage/UserChangePassword.jsx";
import SuccessCheckout from "../components/Booking/SuccessCheckout.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

import { loader as loadData } from "../utils/loadHomeData.js";
import { loader as loadTourData } from "../utils/loadTourData.js";
import { loader as loadTourDetailData } from "../utils/loadTourDetailData.js";
import { loader as loadUserDetail } from "../utils/loadUserDetail.js";
import { loader as loadSuccessCheckout } from "../utils/loadSuccessCheckout.js";
import RootUserPage from "../pages/RootUserPage.jsx";

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
        path: "user",
        element: <RootUserPage />,
        children: [
          {
            path: "detail",
            element: <UserDetailPage />,
            loader: loadUserDetail,
          },
          {
            path: "update-info",
            element: <UserUpdateInfo />,
          },
          {
            path: "update-password",
            element: <UserChangePassword />,
          },
        ],
      },
      {
        path: "checkout-success/:idBooking",
        element: <SuccessCheckout />,
        loader: loadSuccessCheckout,
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
  {
    path: "/forgot-password",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <ForgotPassword />
      </RootAuthPage>
    ),
  },
  {
    path: "/verify-otp",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <OTPPage />
      </RootAuthPage>
    ),
  },
  {
    path: "/reset-password",
    errorElement: <ErrorPage />,
    element: (
      <RootAuthPage>
        <ResetPassword />
      </RootAuthPage>
    ),
  },
]);

export default router;
