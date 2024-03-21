import Subtitle from "../../shared/Subtitle";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import headingBorderImg from "../../assets/img/heading-border.webp";
import BlogList from "../../components/Blogs/BlogList";
import "./BlogPage.css";

function BlogPage() {
  const { blogs } = useLoaderData();

  return (
    <section className="section-bg">
      <div className="container">
        <div className="d-flex flex-column gap-16 blog-header">
          <div>
            <Subtitle subtitle="Blog~" />
            <h4 className="header__title">
              Khám phá Sự đặt sắc và
              <br /> Cập nhật tin tức mới nhất
            </h4>
          </div>
          <p>
            HoYoViVu, nơi mà việc khám phá thế giới trở nên dễ dàng hơn bao giờ
            hết!
            <br /> Blog chuyên cung cấp thông tin về tour du lịch của chúng tôi
            là điểm đến lý tưởng cho những ai đam mê khám phá và trải nghiệm các
            điểm đến mới mẻ trên khắp thế giới.
          </p>
          <div>
            <img src={headingBorderImg} alt="Heading Border Image" />
          </div>
        </div>
        <div className="row row-gap-5 mt-5">
          <div className="col-xl-9 col-lg-9 col-md-12 col-12">
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading Blog...</p>}
            >
              <Await resolve={blogs}>
                {(loadedBlog) => (
                  <BlogList blogs={loadedBlog} itemsPerPage={6} />
                )}
              </Await>
            </Suspense>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
            <div className="tour-content px-3 sticky">
              <div className="text-center py-2 px-1 mb-2">
                <h5 className="md fs-5 fw-bold mb-3">Creator HoYo</h5>
                <p className="sm">Số bài viết của bạn: 0 / bài</p>
              </div>
              <div className="blog-tool__list">
                <Link to="/blog/create" className="blog-tool__item">
                  <i className="ri-add-circle-fill"></i>
                  <span className="sm fs-6">Tạo bài viết</span>
                </Link>
                <Link to="/blog/manage" className="blog-tool__item">
                  <i className="ri-settings-5-fill"></i>
                  <span className="sm fs-6">Quản lý bài viết</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
