import { Link } from "react-router-dom";
import { useRef } from "react";

import NavItem from "./NavItem";
import "./Header.css";

function Header() {
  const refOffCanvas = useRef();
  const refBtnClose = useRef();

  function handleToggle() {
    const classes = refOffCanvas.current.className;

    if (classes.includes("show")) {
      refBtnClose.current.click();
    }
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand show-on-pc" to="/">
            HoYoViVu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            ref={refOffCanvas}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                HoYoViVu
              </h5>
              <button
                ref={refBtnClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 column-gap-3">
                <NavItem title="Home" to="/" onToggle={handleToggle} />
                <NavItem title="Tour" to="/tours" onToggle={handleToggle} />
                <NavItem title="Blog" to="/blog" onToggle={handleToggle} />
                <NavItem
                  title="About us"
                  to="/about-us"
                  onToggle={handleToggle}
                />
              </ul>
            </div>
          </div>
          <div className="navbar-user ms-auto column-gap-3">
            <Link className="login-button">Login</Link>
            <Link className="login-button">Register</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
