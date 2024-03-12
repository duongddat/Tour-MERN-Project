import { Form, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import LoginImg from "../../assets/img/login.png";
import BgLogin from "../../assets/img/bg-login.jpg";
import { fetchingLogin } from "../../utils/https.js";
import { clearMessage, setMessage } from "../../store/message-slice.js";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);

    try {
      const response = await fetchingLogin(data);
      dispatch(
        setMessage({
          type: response.status,
          message: response.message,
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          type: "error",
          message: error.message,
        })
      );
    }
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size">
          <div
            className="col-md-6 side-image"
            style={{ backgroundImage: `url(${BgLogin})` }}
          >
            <div className="text">
              <p>HoYoViVu</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="input-box">
              <header>
                <span>Đăng nhập</span>
                <img src={LoginImg} alt="Login image" />
              </header>
              <Form onSubmit={handleSubmit}>
                <div className="input-field mb-4">
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <label htmlFor="password">Mật khẩu</label>
                </div>
                <div className="text-footer text-end mt-2 mb-3">
                  <Link to="/register">Quên mật khẩu?</Link>
                </div>
                <div className="input-field">
                  <button type="submit" className="button btn-submit">
                    Đăng nhập
                  </button>
                </div>
                <div className="text-footer text-center mt-3">
                  <span>Chưa có tài khoản? </span>
                  <Link to="/register">Tạo tài khoản ngay</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
