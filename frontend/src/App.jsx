import "./App.css";
import "remixicon/fonts/remixicon.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/auth-slice";
import { useGetUserDetailsQuery } from "./store/auth-service";

function App() {
  const dispatch = useDispatch();
  const { data } = useGetUserDetailsQuery("userDetails");

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
