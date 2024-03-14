import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setMessage } from "../store/message-slice";
import { useEffect } from "react";

function RootProtect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập tài khoản!!!",
        })
      );
    }
  }, [userInfo, dispatch, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default RootProtect;
