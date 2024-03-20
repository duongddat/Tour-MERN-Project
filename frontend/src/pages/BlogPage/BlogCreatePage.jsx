import BlogForm from "../../components/Blogs/BlogForm";

function BlogCreatePage() {
  return (
    <section>
      <div className="container container-medium">
        <div className="tour-content">
          <div className="blog-header__title sm fs-5 mb-4">Đăng bài</div>
          <BlogForm />
        </div>
      </div>
    </section>
  );
}

export default BlogCreatePage;
