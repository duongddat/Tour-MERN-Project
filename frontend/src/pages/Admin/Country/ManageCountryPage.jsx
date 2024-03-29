import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useRef, useState } from "react";

import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import ShowModal from "../../../components/common/ShowModal";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteCountryAdmin } from "../../../utils/Admin/adminHttps";

function ManageCountryPage() {
  const { countries } = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteCountry } = useAction(
    deleteCountryAdmin,
    "/admin/countries"
  );
  const idRef = useRef();

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteBlog() {
    await actionDeleteCountry(idRef.current);

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
      name: "Tên quốc gia",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Công cụ",
      cell: (row) => (
        <div className="table-action">
          <Link
            to={`/admin/countries/${row._id}/detail`}
            className="action-btn action-btn__detail"
          >
            <i className="ri-eye-2-line"></i>
          </Link>
          <Link
            to={`/admin/countries/${row._id}/edit`}
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
          <h5 className="table-title">Danh sách quốc gia</h5>
          <Link
            to="/admin/countries/add"
            className="button d-flex gap-1 fw-bold"
          >
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới quốc gia</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Countries...</p>}
        >
          <Await resolve={countries}>
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
            <h5 className="sm p-2">Bạn có chắc xoá quốc gia này?</h5>
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

export default ManageCountryPage;
