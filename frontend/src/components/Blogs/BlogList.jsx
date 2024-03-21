import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import BlogItem from "./BlogItem";

function BlogList({ blogs, itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="row row-gap-4 mb-4">
        {currentItems.map((blog) => (
          <div key={blog._id} className="col-lg-12 col-md-12 col-12">
            <BlogItem blog={blog} />
          </div>
        ))}
      </div>
      <Pagination pageCount={pageCount} onPageClick={handlePageClick} />
    </>
  );
}

export default BlogList;
