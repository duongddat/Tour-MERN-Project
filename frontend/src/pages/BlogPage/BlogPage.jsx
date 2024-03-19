import Subtitle from "../../shared/Subtitle";

import headingBorderImg from "../../assets/img/heading-border.webp";
import "./BlogPage.css";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import BlogList from "../../components/Blogs/BlogList";

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
        <div className="row mt-5">
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
          <div className="col-xl-3 col-lg-3 col-md-none col-sm-none">
            <div className="tour-content sticky">hahahah</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
