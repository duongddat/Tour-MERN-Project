import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { useAction } from "../../../hooks/useAction.js";
import BlogForm from "../../../components/Blogs/BlogForm.jsx";
import { createBlog } from "../../../utils/https.js";

function AddBlogPage() {
  const { countries } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [countriesData, setCountriesData] = useState([]);

  const { isLoading, action } = useAction(createBlog, "/admin/blogs");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setCountriesData(await countries);
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
      setLoading(false);
    }

    getData();
  }, [countries]);

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Thêm mới bài viết</h5>
          <Link to="/admin/blogs" className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách bài viết</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          {loading && <p className="text-center">Loading data....</p>}
          {!loading && (
            <BlogForm
              countries={countriesData}
              isLoading={isLoading}
              action={action}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AddBlogPage;
