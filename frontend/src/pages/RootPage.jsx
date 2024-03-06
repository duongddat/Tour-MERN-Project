import { Outlet, ScrollRestoration } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";

const RootPage = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <ScrollRestoration />
    </>
  );
};

export default RootPage;
