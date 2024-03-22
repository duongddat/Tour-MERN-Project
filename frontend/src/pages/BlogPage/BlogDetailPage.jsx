import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import BlogDetail from "../../components/Blogs/BlogDetail";

function BlogDetailPage() {
  const { blog } = useLoaderData();

  return (
    <section className="section-bg">
      <div className="container container-medium">
        <div className="tour-content">
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading Blog...</p>}
          >
            <Await resolve={blog}>
              {(loadedBlog) => <BlogDetail blog={loadedBlog} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailPage;
