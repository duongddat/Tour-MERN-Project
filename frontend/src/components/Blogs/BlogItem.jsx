import { Link } from "react-router-dom";
import { formatVietnameseDate } from "../../helper/formattingDate";

import "./Blog.css";
import { useSelector } from "react-redux";

function BlogItem({ blog }) {
  const { userInfo } = useSelector((state) => state.auth);

  const maxLength = 220;
  const shortDescription =
    blog.description.length > maxLength
      ? blog.description.substring(0, maxLength - 3) + "..."
      : blog.description;
  const liked = userInfo && blog.likes.includes(userInfo._id);

  return (
    <div className="card">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
          <img
            src={`http://localhost:8080/img/post/${blog.photo[0]}`}
            alt="Blog image"
            className="blog-image"
          />
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12 col-12">
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
              <p className="blog-description sm">{shortDescription}</p>
            </div>
            <div className="blog__footer d-flex flex-wrap justify-content-between">
              <div className={`blog-like ${liked ? "blog-liked" : ""}`}>
                <span className="blog-like__icon">
                  <i className="ri-heart-fill"></i>
                </span>
                <span className="blog-like__text">
                  {liked ? "Liked" : "Like"}
                </span>
                <span>{blog.likes.length}</span>
              </div>
              <div className="d-flex gap-2">
                <Link className="button button-icon">
                  <i className="ri-pencil-line"></i>
                </Link>
                <span className="button button-icon btn-red">
                  <i className="ri-delete-bin-fill"></i>
                </span>
                <Link className="button">Xem chi tiết</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
