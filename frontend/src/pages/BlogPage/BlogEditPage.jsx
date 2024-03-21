import { Await, useLoaderData } from "react-router-dom";
import BlogForm from "../../components/Blogs/BlogForm";
import { Suspense } from "react";

function BlogEditPage() {
  const { blog, countries } = useLoaderData();

  return (
    <section>
      <div className="container container-medium">
        <div className="tour-content">
          <div className="blog-header__title sm fs-5 mb-4">Chỉnh sửa bài</div>
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading blog...</p>}
          >
            <Await resolve={blog}>
              {(loadedBlog) => (
                <BlogForm countries={countries} blog={loadedBlog} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default BlogEditPage;
