import { useLoaderData } from "react-router-dom";
import BlogForm from "../../components/Blogs/BlogForm";
import { useAction } from "../../hooks/useAction";
import { createBlog } from "../../utils/https";

function BlogCreatePage() {
  const { countries } = useLoaderData();
  const { isLoading, action } = useAction(createBlog, "/blog");

  return (
    <section>
      <div className="container container-medium">
        <div className="tour-content">
          <div className="blog-header__title sm fs-5 mb-4">Đăng bài</div>
          <BlogForm
            countries={countries}
            isLoading={isLoading}
            action={action}
          />
        </div>
      </div>
    </section>
  );
}

export default BlogCreatePage;
