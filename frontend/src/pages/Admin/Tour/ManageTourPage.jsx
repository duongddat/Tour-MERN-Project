import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useRef, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import { currencyFormatter } from "../../../helper/formattingPrice";
import ShowModal from "../../../components/common/ShowModal";
import { useAction } from "../../../hooks/useAction";
import { deleteTourAdmin } from "../../../utils/Admin/adminHttps";
import Spin from "../../../components/common/Spin";

function ManageTourPage() {
  const { tours } = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteTour } = useAction(
    deleteTourAdmin,
    "/admin/tours"
  );
  const idTourRef = useRef();

  function openModal(id) {
    setIsOpen(true);
    idTourRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteBlog() {
    await actionDeleteTour(idTourRef.current);

    if (!isLoading) {
      closeModal();
    }
  }

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
      selector: (row) =>
        currencyFormatter.format(row.priceDiscount || row.price),
      sortable: true,
      style: {
        color: "red",
        fontWeight: "bold",
      },
    },
    {
      name: "Thời lượng",
      selector: (row) => row.duration + " ngày",
      sortable: true,
    },
    {
      name: "Công cụ",
      cell: (row) => (
        <div className="table-action">
          <Link
            to={`/admin/tours/${row._id}/detail`}
            className="action-btn action-btn__detail"
          >
            <i className="ri-eye-2-line"></i>
          </Link>
          <Link
            to={`/admin/tours/${row._id}/edit`}
            className="action-btn action-btn__edit"
          >
            <i className="ri-pencil-fill"></i>
          </Link>
          <div
            className="action-btn action-btn__delete"
            onClick={() => openModal(row._id)}
          >
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
      <ShowModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-3 modal-container">
          <div className="modal-close">
            <i className="ri-close-circle-fill" onClick={closeModal}></i>
          </div>
          <div className="modal-title">
            <h5 className="sm p-2">Bạn có chắc xoá tour?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteBlog()}
              className="button text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spin text="Xoá..." /> : "Đồng ý"}
            </button>
            <button
              onClick={closeModal}
              className="button btn-red text-white"
              disabled={isLoading}
            >
              Đóng
            </button>
          </div>
        </div>
      </ShowModal>
    </section>
  );
}

export default ManageTourPage;
