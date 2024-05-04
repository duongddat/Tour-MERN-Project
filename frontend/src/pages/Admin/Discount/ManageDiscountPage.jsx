import { Suspense, useRef, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import { deleteDiscountAdmin } from "../../../utils/Admin/adminHttps";
import { useAction } from "../../../hooks/useAction";
import TableData from "../../../components/Table/TableData";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { formatDateDefault } from "../../../helper/formattingDate";

function ManageDiscountPage() {
  const { discounts } = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteDiscount } = useAction(
    deleteDiscountAdmin,
    "/admin/discounts"
  );
  const idRef = useRef();

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteDiscount() {
    await actionDeleteDiscount(idRef.current);

    if (!isLoading) {
      closeModal();
    }
  }

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Mã giảm giá",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Danh mục",
      selector: (row) => row.country.name,
      sortable: true,
    },
    {
      name: "Phần trăm giảm giá",
      selector: (row) => row.percentage + "%",
      sortable: true,
    },
    {
      name: "Ngày hết hạn",
      selector: (row) => formatDateDefault(row.expiryDate),
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <span
          className={`text-booking ${
            row.isActive ? "booking-success" : "booking-remaining"
          }`}
        >
          {row.isActive ? "active" : "inactive"}
        </span>
      ),
    },
    {
      name: "Công cụ",
      cell: (row) => (
        <div className="table-action">
          <Link
            to={`/admin/discounts/${row._id}/detail`}
            className="action-btn action-btn__detail"
          >
            <i className="ri-eye-2-line"></i>
          </Link>
          <Link
            to={`/admin/discounts/${row._id}/edit`}
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
          <h5 className="table-title">Danh sách mã giảm giá</h5>
          <Link
            to="/admin/discounts/add"
            className="button d-flex gap-1 fw-bold"
          >
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới mã giảm giá</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Countries...</p>}
        >
          <Await resolve={discounts}>
            {(loadedData) => <TableData columns={columns} data={loadedData} />}
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
            <h5 className="sm p-2">Bạn có chắc xoá mã giảm giá này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteDiscount()}
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

export default ManageDiscountPage;
