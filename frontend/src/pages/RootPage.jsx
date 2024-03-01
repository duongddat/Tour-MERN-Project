import { Outlet } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";

const RootPage = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default RootPage;
