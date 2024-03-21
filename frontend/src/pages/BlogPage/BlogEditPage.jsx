import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import BlogForm from "../../components/Blogs/BlogForm";
import { useAction } from "../../hooks/useAction";
import { editBlog } from "../../utils/https";

function BlogEditPage() {
  const { blog, countries } = useLoaderData();
  const { isLoading, action } = useAction(editBlog, "/blog");

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
                <BlogForm
                  countries={countries}
                  isLoading={isLoading}
                  action={action}
                  blog={loadedBlog}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default BlogEditPage;
