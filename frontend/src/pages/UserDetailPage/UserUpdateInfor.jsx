import { Suspense, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Await, Form, useLoaderData } from "react-router-dom";
import { setMessage } from "../../store/message-slice";

import headingBorderImg from "../../assets/img/heading-border.webp";

function UserUpdateInfor() {
  const { user } = useLoaderData();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const inputAvaRef = useRef();

  function handleImageClick() {
    inputAvaRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatar(file);
    } else {
      event.target.value = null;
      dispatch(
        setMessage({ type: "error", message: "Vui lòng chọn đúng file ảnh!" })
      );
    }
  }

  function handleUpdateInfo(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
  }

  return (
    <div className="tour-content">
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading User...</p>}
      >
        <Await resolve={user}>
          {(loadedUser) => (
            <div className="user-detail-content">
              <h5 className="user-detail__title">Cập nhật thông tin</h5>
              <div className="mb-3">
                <img src={headingBorderImg} alt="Heading Border Image" />
              </div>
              <Form onSubmit={handleUpdateInfo}>
                <div className="mb-4 d-flex flex-column justify-content-center align-items-center">
                  {!avatar ? (
                    <img
                      src={`http://localhost:8080/img/user/${loadedUser.photo}`}
                      alt={loadedUser.name}
                      className="user-detail__img"
                      onClick={handleImageClick}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt={loadedUser.name}
                      className="user-detail__img"
                      onClick={handleImageClick}
                    />
                  )}
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    ref={inputAvaRef}
                    onChange={handleImageChange}
                    className="user-input__photo"
                  />
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="mt-3 button"
                  >
                    Đổi ảnh đại diện
                  </button>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={loadedUser.name}
                    required
                  />
                  <label htmlFor="name">Họ tên</label>
                </div>
                <div className="input-field mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loadedUser.email}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field mt-2 mb-3">
                  <button
                    type="submit"
                    className="button btn-submit w-25 m-auto"
                  >
                    Cập nhật
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default UserUpdateInfor;
