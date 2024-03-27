import { Navigate, createBrowserRouter } from "react-router-dom";

import RootPage from "../pages/RootPage.jsx";
import RootAuthPage from "../pages/RootAuthPage.jsx";
import RootUserPage from "../pages/RootUserPage.jsx";
import RootAdminPage from "../pages/RootAdminPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import TourPage from "../pages/ToursPage/TourPage.jsx";
import DetailPage from "../pages/DetailTourPage/DetailTourPage.jsx";
import BlogPage from "../pages/BlogPage/BlogPage.jsx";
import BlogManagePage from "../pages/BlogPage/BlogManagePage.jsx";
import BlogDetailPage from "../pages/BlogPage/BlogDetailPage.jsx";
import BlogCreatePage from "../pages/BlogPage/BlogCreatePage.jsx";
import BlogEditPage from "../pages/BlogPage/BlogEditPage.jsx";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage.jsx";
import MyTourPage from "../pages/MyTourPage/MyTourPage.jsx";
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

import HomeAdminPage from "../pages/Admin/Home/HomePage.jsx";
import ManageTourPage from "../pages/Admin/Tour/ManageTourPage.jsx";
import AddTourAdminPage from "../pages/Admin/Tour/AddTourPage.jsx";
import EditTourAdminPage from "../pages/Admin/Tour/EditTourPage.jsx";
import DetailTourAdminPage from "../pages/Admin/Tour/DetailTourPage.jsx";
import ManageCountryPage from "../pages/Admin/Country/ManageCountryPage.jsx";
import ManageBlogPage from "../pages/Admin/Blog/ManageBlogPage.jsx";
import ManageReviewPage from "../pages/Admin/Review/ManageReviewPage.jsx";
import ManageUserPage from "../pages/Admin/User/ManageUserPage.jsx";
import Revenue from "../pages/Admin/Statistical/Revenue.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import { loader as loadData } from "../utils/loadHomeData.js";
import { loader as loadTourData } from "../utils/loadTourData.js";
import { loader as loadTourDetailData } from "../utils/loadTourDetailData.js";
import { loader as loadUserDetail } from "../utils/loadUserDetail.js";
import { loader as loadSuccessCheckout } from "../utils/loadSuccessCheckout.js";
import { loader as loadBlogData } from "../utils/loadBlogData.js";
import { loader as loadBlogCreate } from "../utils/loadBlogCreate.js";
import { loader as loadBlogEdit } from "../utils/loadBlogEdit.js";
import { loader as loadBlogDetail } from "../utils/loadBlogDetail.js";
import { loader as loadBlogManage } from "../utils/loadBlogManage.js";
import { loader as loadMyTour } from "../utils/loadMyTour.js";

import { loader as loadTourAdmin } from "../utils/loadTourAdmin.js";
import { loader as loadTourCreatAdmin } from "../utils/loadTourCreateAdmin.js";
import { loader as loadTourEditAdmin } from "../utils/loadTourEditAdmin.js";
import { loader as loadTourDetailAdmin } from "../utils/loadTourDetailAdmin.js";

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
      {
        path: "blog",
        children: [
          { index: true, element: <BlogPage />, loader: loadBlogData },
          {
            path: "manage",
            element: <BlogManagePage />,
            loader: loadBlogManage,
          },
          {
            path: "detail/:idBlog",
            element: <BlogDetailPage />,
            loader: loadBlogDetail,
          },
          {
            path: "create",
            element: <BlogCreatePage />,
            loader: loadBlogCreate,
          },
          {
            path: "edit/:idBlog",
            element: <BlogEditPage />,
            loader: loadBlogEdit,
          },
        ],
      },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "my-tour", element: <MyTourPage />, loader: loadMyTour },
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
            loader: loadUserDetail,
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
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <RootAdminPage />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomeAdminPage /> },
      {
        path: "tours",
        children: [
          { index: true, element: <ManageTourPage />, loader: loadTourAdmin },
          {
            path: "add",
            element: <AddTourAdminPage />,
            loader: loadTourCreatAdmin,
          },
          {
            path: ":idTour/edit",
            element: <EditTourAdminPage />,
            loader: loadTourEditAdmin,
          },
          {
            path: ":idTour/detail",
            element: <DetailTourAdminPage />,
            loader: loadTourDetailAdmin,
          },
        ],
      },
      { path: "countries", element: <ManageCountryPage /> },
      { path: "blogs", element: <ManageBlogPage /> },
      { path: "reviews", element: <ManageReviewPage /> },
      { path: "users", element: <ManageUserPage /> },
      { path: "revenue", element: <Revenue /> },
    ],
  },
]);

export default router;
