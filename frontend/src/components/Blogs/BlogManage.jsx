import { useSelector } from "react-redux";

import bgManage from "../../assets/img/bg.webp";
import borderAva from "../../assets/img/border-ava.png";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";

function BlogManage({ blogs }) {
  const { userInfo } = useSelector((state) => state.auth);

  let totalLikes = 0;

  blogs.forEach((post) => {
    totalLikes += post.likes.length;
  });

  return (
    <div className="blog-manage">
      <div className="profile-container">
        <div className="profile-bg">
          <div className="profile-bg_wrapper">
            <img src={bgManage} alt="background manage" />
            <div className="profile-bg_bot-mark"></div>
          </div>
        </div>
        <div className="profile-content">
          <div className="layout-topbar">
            <div className="mhy-topbar">
              <div className="mhy-topbar_container">
                <div className="account-center-topbar_container">
                  <div className="account-cetner-avatar-wrap">
                    <div className="mhy-avatar">
                      <img
                        className="mhy-avatar_img"
                        src={`http://localhost:8080/img/user/${userInfo.photo}`}
                        alt="user avatar"
                      />
                      <img
                        className="mhy-avatar_pendant"
                        src={borderAva}
                        alt="border image"
                      />
                    </div>
                  </div>
                  <div className="account-center-user-wrap">
                    <div className="account-center-basic-top">
                      <span className="user-basic-nickname">
                        {userInfo.name}
                      </span>
                      <div className="mhy-account-title_level">
                        <span>{userInfo.role}</span>
                      </div>
                    </div>
                    <div className="account-center-basic-bottom">
                      <div className="account-center-basic-item">
                        <span className="account-center-basic-num">
                          {blogs.length}
                        </span>
                        <span className="account-center-basic-name">POST</span>
                        <span className="account-center-basic-split">/</span>
                      </div>
                      <div className="account-center-basic-item">
                        <span className="account-center-basic-num">
                          {totalLikes}
                        </span>
                        <span className="account-center-basic-name">LIKE</span>
                      </div>
                    </div>
                  </div>
                  <div className="account-center-btn">
                    <Link to="/blog/create" className="button">
                      Tạo bài viết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-5 section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9 col-md-12 col-12">
              <BlogList blogs={blogs} itemsPerPage={6} />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <div className="sticky">Hahahah</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogManage;
