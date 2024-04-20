import TourItem from "./TourItem.jsx";

import NoData from "../../assets/img/NoData.png";
import Pagination from "../Pagination/Pagination.jsx";
import { useState } from "react";
// import tours from "../../assets/data/tour";

function TourListPagination({ tours, classes, itemsPerPage, onScroll }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tours.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tours.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tours.length;
    onScroll();
    setItemOffset(newOffset);
  };

  return (
    <div className="row row-gap-5 sticky">
      {currentItems.length > 0 &&
        currentItems.map((tour) => (
          <div key={tour.id} className={classes}>
            <TourItem tour={tour} />
          </div>
        ))}
      {currentItems.length === 0 && (
        <div className="card card-message">
          <div className="message-img">
            <img src={NoData} alt="Message image" />
          </div>
          <div className="d-flex flex-column gap-2">
            <h4>Rất tiết, HoYoViVu không thể tìm thấy kết quả phù hợp</h4>
            <p className="md" style={{ color: "#475467" }}>
              Vui lòng tìm kiếm tour du lịch khác!!!
            </p>
          </div>
        </div>
      )}
      {currentItems.length > 0 && (
        <Pagination pageCount={pageCount} onPageClick={handlePageClick} />
      )}
    </div>
  );
}

export default TourListPagination;
