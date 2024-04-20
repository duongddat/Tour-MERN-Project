import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import BlogItem from "./BlogItem";
import noDataMessage from "../../assets/img/no-data-message.png";

function BlogList({ blogs, itemsPerPage, onScroll }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    onScroll();
    setItemOffset(newOffset);
  };

  return (
    <>
      {blogs.length > 0 && (
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
      )}
      {blogs.length === 0 && (
        <div className="tour-content">
          <div className="mhy-data-lg">
            <img src={noDataMessage} alt="No data message blog" />
            <p className="mhy-data-lg_text">Bạn chưa có bài viết nào~</p>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;
