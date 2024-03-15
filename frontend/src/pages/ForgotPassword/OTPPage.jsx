import { Form, Link } from "react-router-dom";

import { useAction } from "../../hooks/useAction";
import { verifyOTP } from "../../utils/https";
import Spin from "../../components/common/Spin";
import "./ForgotPassword.css";

function OTPPage() {
  const { isLoading, action } = useAction(verifyOTP, "/reset-password");

  function handleSubmitOTP(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    action(data);
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size_sm">
          <div className="input-box d-flex justify-content-center align-items-center flex-column">
            <header className="mb-3 text-uppercase">
              <span>Xác nhận OTP</span>
              <p className="text-sm mt-2">
                Xác nhận OTP thông qua email của bạn! <br /> Vui lòng xác nhận
                trong vòng 10 phút
              </p>
            </header>
            <Form className="w-100 p-3" onSubmit={handleSubmitOTP}>
              <div className="input-field">
                <input type="text" id="otp" name="otp" required />
                <label htmlFor="otp">Mã OTP</label>
              </div>
              <div className="text-footer text-end mt-2 mb-4">
                <Link to="/verify-otp">Gửi lại OTP</Link>
              </div>
              <div className="input-field">
                <button
                  type="submit"
                  className="button btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spin text="Xác thực..." /> : "Xác nhận"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPPage;
