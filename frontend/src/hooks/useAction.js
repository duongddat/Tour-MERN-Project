import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../store/message-slice";

export function useAction(actionFn, navigateRoute = null) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function action(argument) {
    setIsLoading(true);
    try {
      const resData = await actionFn(argument);
      dispatch(setMessage({ type: resData.status, message: resData.message }));
      if (resData.status === "success" && navigateRoute) {
        navigate(navigateRoute);
      }
    } catch (error) {
      dispatch(setMessage({ type: "error", message: error.message }));
    }

    setIsLoading(false);
  }

  return { isLoading, action };
}
