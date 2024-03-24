import "./App.css";
import "remixicon/fonts/remixicon.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/auth-slice";
import { useGetUserDetailsQuery } from "./store/auth-service";
import Loading from "./shared/Loading";

function App() {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetUserDetailsQuery("userDetails");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
      setIsDataLoaded(true);
    }
  }, [data, dispatch]);

  if (isLoading || !isDataLoaded) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
}

export default App;
