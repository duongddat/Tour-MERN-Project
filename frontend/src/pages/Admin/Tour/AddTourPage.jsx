import { Link } from "react-router-dom";

import TourFormAdmin from "../../../components/Tours/TourFormAdmin.jsx";
import headingBorderImg from "../../../assets/img/heading-border.webp";

function AddTourPage() {
  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Thêm mới tour</h5>
          <Link className="button d-flex gap-1 fw-bold">
            <i className="ri-file-list-3-line"></i>
            <span>Danh sách tour</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <div className="my-3">
          <TourFormAdmin />
        </div>
      </div>
    </section>
  );
}

export default AddTourPage;
