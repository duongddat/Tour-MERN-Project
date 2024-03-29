import { Suspense, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Await, Link, useLoaderData } from "react-router-dom";

import ShowModal from "../../../components/common/ShowModal";
import headingBorderImg from "../../../assets/img/heading-border.webp";
import TableData from "../../../components/Table/TableData";
import Spin from "../../../components/common/Spin";
import { useAction } from "../../../hooks/useAction";
import { deleteBlog } from "../../../utils/Admin/adminHttps";
import { formatVietnameseDate } from "../../../helper/formattingDate";

function ManageBlogPage() {
  const { blogs } = useLoaderData();
  const { userInfo } = useSelector((state) => state.auth);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, action: actionDeleteBlog } = useAction(
    deleteBlog,
    "/admin/blogs"
  );
  const idRef = useRef();

  function openModal(id) {
    setIsOpen(true);
    idRef.current = id;
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteItem() {
    await actionDeleteBlog(idRef.current);

    if (!isLoading) {
      closeModal();
    }
  }

  const columns = [
    {
      name: "Tiêu đề",
      selector: (row) => row.title,
      sortable: true,
    },
    { name: "Chủ đề", selector: (row) => row.country.name, sortable: true },
    {
      name: "Người đăng",
      selector: (row) => (
        <div className="table-item__2t">
          <span>{row.user.name}</span>
          <span
            className={`table-item__special ${
              row.user.role === "admin"
                ? "role-admin"
                : row.user.role === "guide"
                ? "role-guide"
                : "role-user"
            }`}
          >
            role: {row.user.role}
          </span>
        </div>
      ),
    },
    {
      name: "Ngày đăng",
      selector: (row) => formatVietnameseDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Công cụ",
      cell: (row) => (
        <div className="table-action">
          <Link
            to={`/admin/blogs/${row._id}/detail`}
            className="action-btn action-btn__detail"
          >
            <i className="ri-eye-2-line"></i>
          </Link>
          {userInfo._id === row.user._id && (
            <Link
              to={`/admin/blogs/${row._id}/edit`}
              className="action-btn action-btn__edit"
            >
              <i className="ri-pencil-fill"></i>
            </Link>
          )}
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
          <h5 className="table-title">Danh sách bài viết</h5>
          <Link to="/admin/blogs/add" className="button d-flex gap-1 fw-bold">
            <i className="ri-add-circle-line"></i>
            <span>Thêm mới bài viết</span>
          </Link>
        </div>
        <div className="mb-2">
          <img src={headingBorderImg} alt="Heading Border Image" />
        </div>
        <Suspense
          fallback={<p style={{ textAlign: "center" }}>Loading Posts...</p>}
        >
          <Await resolve={blogs}>
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
            <h5 className="sm p-2">Bạn có chắc xoá bài viết này?</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-3 mt-4">
            <button
              onClick={() => handleDeleteItem()}
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

export default ManageBlogPage;
