import SideBarAdmin from "./SideBar/SideBarAdmin";

function AdminLayout({ children }) {
  return (
    <div className="wrapper-admin">
      <SideBarAdmin />
      <div className="main-admin p-3">{children}</div>
    </div>
  );
}

export default AdminLayout;
