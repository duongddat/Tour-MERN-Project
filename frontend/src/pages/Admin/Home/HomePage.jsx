import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { formatVietnameseDate } from "../../../helper/formattingDate";

function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section>
      <div className="row">
        <div className="col-lg-8 col-md-6 col-12">
          <div className="row row-gap-4">
            <div className="col-12">
              <div className="tour-content">
                <div className="user-detail-content">
                  <h5 className="user-detail__title">Thông tin người dùng</h5>
                  <div className="mb-2">
                    <img src={headingBorderImg} alt="Heading Border Image" />
                  </div>
                  <div className="user-detail__info">
                    <div className="user-detail__header">
                      <img
                        src={`http://localhost:8080/img/user/${userInfo.photo}`}
                        alt={userInfo.name}
                        className="user-detail__img"
                      />
                      <Link
                        className="user-detail__update button"
                        to={`/admin/users/${userInfo._id}/edit`}
                      >
                        <i className="ri-pencil-fill"></i>
                        <span className="mx-2 d-none d-sm-inline">
                          Cập nhật thông tin
                        </span>
                      </Link>
                    </div>
                    <div className="user-detail__body">
                      <div className="user-detail__flied">
                        <i className="ri-id-card-fill"></i>
                        <strong>Tên người dùng:</strong>
                        <span>{userInfo.name}</span>
                      </div>
                      <div className="user-detail__flied">
                        <i className="ri-mail-fill"></i>
                        <strong>Email:</strong>
                        <span>{userInfo.email}</span>
                      </div>
                      <div className="user-detail__flied">
                        <i className="ri-information-fill"></i>
                        <strong>Chức vụ:</strong>
                        <span>{userInfo.role}</span>
                      </div>
                      <div className="user-detail__flied">
                        <i className="ri-calendar-event-line"></i>
                        <strong>Ngày tạo:</strong>
                        <span>{formatVietnameseDate(userInfo.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <div className="tour-content"></div>
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <div className="tour-content"></div>
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <div className="tour-content"></div>
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <div className="tour-content"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <div className="tour-content h-100"></div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
