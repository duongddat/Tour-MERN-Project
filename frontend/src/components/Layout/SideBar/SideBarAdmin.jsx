import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./SideBarAdmin.css";

function SideBarAdmin() {
  const sideRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sideBarElement = sideRef.current;
    if (!sideBarElement) return;

    if (windowSize.width < 768) {
      sideBarElement.classList.remove("expand");
    } else {
      sideBarElement.classList.add("expand");
    }
  }, [windowSize]);

  function handleToggleSideBar() {
    const sideBarElement = sideRef.current;

    sideBarElement.classList.toggle("expand");
  }

  return (
    <aside ref={sideRef} id="sidebar-admin" className="expand">
      <div className="d-flex align-items-center">
        <button id="toggle-btn" type="button" onClick={handleToggleSideBar}>
          <i className="ri-layout-grid-fill"></i>
        </button>
        <div className="sidebar-logo">
          <Link>HoYoViVu</Link>
        </div>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <NavLink className="sidebar-link active-admin">
            <i className="ri-home-line"></i>
            <span>Trang chủ</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link">
            <i className="ri-btc-line"></i>
            <span>Tour</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link">
            <i className="ri-compass-line"></i>
            <span>Quốc gia</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link">
            <i className="ri-blogger-fill"></i>
            <span>Bài viết</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link">
            <i className="ri-chat-thread-line"></i>
            <span>Bình luận</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink className="sidebar-link">
            <i className="ri-user-3-line"></i>
            <span>Người dùng</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <Link
            className="sidebar-link has-dropdown collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#auth"
            aria-expanded="false"
            aria-controls="auth"
          >
            <i className="ri-pie-chart-2-line"></i>
            <span>Thống kê</span>
          </Link>
          <ul
            id="auth"
            className="sidebar-dropdown accordion-collapse list-unstyled collapse"
            data-bs-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link className="sidebar-link">
                <text className="sidebar-dropdown__item">Doanh thu</text>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link">
                <text className="sidebar-dropdown__item">Thống kế tour</text>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link className="sidebar-link">
          <i className="ri-logout-box-line"></i>
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}

export default SideBarAdmin;
