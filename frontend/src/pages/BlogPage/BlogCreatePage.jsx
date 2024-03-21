import { useLoaderData } from "react-router-dom";
import BlogForm from "../../components/Blogs/BlogForm";

function BlogCreatePage() {
  const { countries } = useLoaderData();

  return (
    <section>
      <div className="container container-medium">
        <div className="tour-content">
          <div className="blog-header__title sm fs-5 mb-4">Đăng bài</div>
          <BlogForm countries={countries} />
        </div>
      </div>
    </section>
  );
}

export default BlogCreatePage;
