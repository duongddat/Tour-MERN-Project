import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import { currencyFormatter } from "../../../helper/formattingPrice";

function ManageTourPage() {
  const { tours } = useLoaderData();

  const columns = [
    {
      name: "Tên tour",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Ảnh bìa",
      selector: (row) => (
        <img
          className="table-img"
          src={`http://localhost:8080/img/tour/${row.imageCover}`}
        />
      ),
    },
    {
      name: "Quốc gia",
      selector: (row) => row.country.name,
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) => currencyFormatter.format(row.price),
      sortable: true,
      style: {
        color: "red",
      },
    },
    {
      name: "Thời lượng",
      selector: (row) => row.duration + " ngày",
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.maxGroupSize + " khách",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="table-action" onClick={() => alert(row._id)}>
          <div className="action-btn action-btn__detail">
            <i className="ri-eye-2-line"></i>
          </div>
          <div className="action-btn action-btn__edit">
            <i className="ri-pencil-fill"></i>
          </div>
          <div className="action-btn action-btn__delete">
            <i className="ri-delete-bin-2-line"></i>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="tour-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h5 className="table-title">Danh sách tour</h5>
          <Link to="/admin/tours/add" className="button d-flex gap-1 fw-bold">
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới tour</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Tour...</p>}
        >
          <Await resolve={tours}>
            {(loadedTours) => (
              <TableData columns={columns} data={loadedTours} />
            )}
          </Await>
        </Suspense>
        <p className="mt-5 text-center text-footer-font">That all</p>
      </div>
    </section>
  );
}

export default ManageTourPage;
