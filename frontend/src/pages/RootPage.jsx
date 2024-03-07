import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";

const RootPage = () => {
  const location = useLocation();
  const prevRouteRef = useRef();

  useEffect(() => {
    const splitLocation = location.pathname.split("/");
    const currentRoute = splitLocation[1];

    if (prevRouteRef.current !== currentRoute) {
      window.scrollTo(0, 0);
    }

    prevRouteRef.current = currentRoute;
  }, [location]);

  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default RootPage;
