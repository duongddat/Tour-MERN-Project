import { useEffect } from "react";
import { ScrollRestoration } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { clearMessage } from "../store/message-slice";

const RootAuthPage = ({ children }) => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.message);

  useEffect(() => {
    if (message !== "") {
      const option = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      };

      if (type === "success") {
        toast.success(message, option);
      } else {
        toast.error(message, option);
      }
    }
  }, [message, type]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {children}
      <ScrollRestoration />
    </>
  );
};

export default RootAuthPage;
