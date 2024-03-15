import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAction } from "../../hooks/useAction";
import { resetPassword } from "../../utils/https";
import { setMessage } from "../../store/message-slice";
import Spin from "../../components/common/Spin";

function ResetPassword() {
  const dispatch = useDispatch();
  const { isLoading, action } = useAction(resetPassword, "/login");

  function handleResetPassword(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const { password, passwordConfirm } = data;
    console.log(password, passwordConfirm);

    if (password !== passwordConfirm) {
      dispatch(
        setMessage({
          type: "error",
          message: "Xác nhận mật khẩu không thành công!",
        })
      );
      return;
    }

    action(data);
  }

  return (
    <div className="wrapper">
      <div className="container h-100vh d-flex justify-content-center align-items-center">
        <div className="row container-size_sm">
          <div className="input-box d-flex justify-content-center align-items-center flex-column">
            <header className="mb-3 text-uppercase">
              <span>Đổi mật khẩu</span>
            </header>
            <Form className="w-100 p-3" onSubmit={handleResetPassword}>
              <div className="input-field mb-4">
                <input type="password" id="password" name="password" required />
                <label htmlFor="otp">Mật khẩu</label>
              </div>
              <div className="input-field mb-5">
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  required
                />
                <label htmlFor="passwordConfirm">Nhập lại mật khẩu</label>
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

export default ResetPassword;
