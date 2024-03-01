import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
