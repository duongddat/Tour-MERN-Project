import MenuBar from "./SideBar/MenuBar";
import "./Layout.css";

function UserSettingLayout({ children }) {
  return (
    <section className="section-bg">
      <div className="container container-user">
        <div className="row row-gap-4">
          <div className="col-lg-4 col-md-4 col-auto">
            <MenuBar />
          </div>
          <div className="col-lg-8 col-md-8 col-12">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default UserSettingLayout;
