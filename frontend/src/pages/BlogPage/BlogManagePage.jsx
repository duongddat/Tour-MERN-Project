import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import BlogManage from "../../components/Blogs/BlogManage";
import { useSelector } from "react-redux";

function BlogManagePage() {
  const navigate = useNavigate();
  const { blogs } = useLoaderData();
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    navigate("/blog");
  }

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
