import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import parse from "html-react-parser";

import { formatVietnameseDate } from "../../helper/formattingDate";
import ShowModal from "../common/ShowModal";
import { useAction } from "../../hooks/useAction";
import { deleteBlog, likeBlog } from "../../utils/https";
import { setMessage } from "../../store/message-slice";
import Spin from "../common/Spin";
import "./Blog.css";

function truncateDescription(description, maxLength) {
  if (!description || typeof description !== "string") return "";
  maxLength = maxLength || 80;
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
}

function BlogItem({ blog }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { action } = useAction(likeBlog, location.pathname);
  const { isLoading, action: actionDeleteBlog } = useAction(
    deleteBlog,
    location.pathname
  );

  const liked = userInfo && blog.likes.includes(userInfo._id);

  const truncatedDescription = truncateDescription(blog.description);
  const parsedDescription = parse(truncatedDescription);

  function handleLikeBlog() {
    if (!userInfo) {
      dispatch(
        setMessage({
          type: "error",
          message: "Vui lòng đăng nhập để like bài viết",
        })
      );
    }
    action({ blogId: blog._id });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function loadingAction() {
    if (isLoading) {
      closeModal();
    }
  }

  function handleDeleteBlog(blogId) {
    actionDeleteBlog(blogId);

    loadingAction();
  }

  return (
    <div className="card card-border">
      <div className="row">
        <div className="col-lg-5 col-md-5 col-12">
          <img
            src={`http://localhost:8080/img/post/${blog.photo[0]}`}
            alt="Blog image"
            className="blog-image"
          />
        </div>
        <div className="col-lg-7 col-md-7 col-12">
          <div className="p-4 card-blog__content">
            <div className="blog__body">
              <h5 className="blog-title">{blog.title}</h5>
              <div className="d-flex column-gap-3 align-items-center py-2">
                <div className="blog-user__avatar">
                  <img
                    className="user-avatar"
                    src={`http://localhost:8080/img/user/${blog.user.photo}`}
                    alt={blog.user._id}
                  />
                </div>
                <div className="d-flex flex-column ">
                  <h5 className="md mb-1">{blog.user.name}</h5>
                  <span className="sm blog-date">
                    {formatVietnameseDate(blog.createdAt)}
                  </span>
                </div>
              </div>
              <div className="blog-description sm">{parsedDescription}</div>
              <p className="blog-country sm"># {blog.country.name}</p>
            </div>
            <div className="blog__footer d-flex flex-wrap justify-content-between row-gap-3">
              <div
                className={`blog-like ${liked ? "blog-liked" : ""}`}
                onClick={handleLikeBlog}
              >
                <span className="blog-like__icon">
                  <i className="ri-heart-fill"></i>
                </span>
                <span className="blog-like__text">
                  {liked ? "Liked" : "Like"}
                </span>
                <span>{blog.likes.length}</span>
              </div>
              <div className="d-flex gap-2">
                {userInfo &&
                  (userInfo._id === blog.user._id ||
                    userInfo.role === "admin" ||
                    (userInfo.role === "guide" &&
                      blog.user.role !== "admin")) && (
                    <>
                      {userInfo._id === blog.user._id && (
                        <Link
                          to={`/blog/edit/${blog._id}`}
                          className="button button-icon"
                        >
                          <i className="ri-pencil-line"></i>
                        </Link>
                      )}
                      <span
                        className="button button-icon btn-red"
                        onClick={openModal}
                      >
                        <i className="ri-delete-bin-fill"></i>
                      </span>
                    </>
                  )}
                <Link to={`/blog/detail/${blog._id}`} className="button">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc xoá bài?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Xoá..." /> : "Đồng ý"}
            </button>
            <button
              onClick={closeModal}
              className="button btn-red text-white"
              disabled={isLoading}
            >
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </div>
  );
}

export default BlogItem;
