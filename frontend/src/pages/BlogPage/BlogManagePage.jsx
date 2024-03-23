import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import BlogManage from "../../components/Blogs/BlogManage";

function BlogManagePage() {
  const { blogs } = useLoaderData();

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading Blogs...</p>}
    >
      <Await resolve={blogs}>
        {(loadedBlog) => <BlogManage blogs={loadedBlog} />}
      </Await>
    </Suspense>
  );
}

export default BlogManagePage;
