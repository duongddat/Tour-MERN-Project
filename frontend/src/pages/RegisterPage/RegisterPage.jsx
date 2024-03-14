import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LoginImg from "../../assets/img/login.png";
import BgRegister from "../../assets/img/register.jpg";
import { clearMessage, setMessage } from "../../store/message-slice";
import { registerUser } from "../../store/auth-action";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      dispatch(
        setMessage({
          type: "error",
          message: "Xác nhận mật khẩu không thành công!",
        })
      );
      return;
    }

    dispatch(registerUser(data));
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size">
          <div
            className="col-md-6 side-image"
            style={{ backgroundImage: `url(${BgRegister})` }}
          >
            <div className="text">
              <p>HoYoViVu</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="input-box pt-3 pb-3">
              <header>
                <span>Tạo tài khoản</span>{" "}
                <img src={LoginImg} alt="Login image" />
              </header>
              <Form onSubmit={handleSubmit}>
                <div className="input-field mb-4">
                  <input type="text" id="name" name="name" required />
                  <label htmlFor="name">Họ tên</label>
                </div>
                <div className="input-field mb-4">
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <label htmlFor="password">Mật khẩu</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    required
                  />
                  <label htmlFor="passwird">Xác nhận mật khẩu</label>
                </div>
                <div className="input-field mt-2">
                  <button
                    type="submit"
                    className="button btn-submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Đăng ký"}
                  </button>
                </div>
                <div className="text-footer text-center mt-3">
                  <span>Đã có tài khoản? </span>
                  <Link to="/login">Đăng nhập ngay</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
