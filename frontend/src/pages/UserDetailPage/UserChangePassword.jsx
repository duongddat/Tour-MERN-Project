import { Form } from "react-router-dom";

import headingBorderImg from "../../assets/img/heading-border.webp";

function UserChangePassword() {
  return (
    <div className="tour-content">
      <div className="user-detail-content">
        <h5 className="user-detail__title">Đổi mật khẩu</h5>
        <div className="mb-3">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Form>
          <div className="input-field mb-4">
            <input type="password" id="password" name="password" required />
            <label htmlFor="password">Mật khẩu</label>
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
          <div className="input-field mb-3">
            <button type="submit" className="button btn-submit">
              Xác nhận
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserChangePassword;
