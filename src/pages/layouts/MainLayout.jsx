import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function MainLayout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/dashboard";

  return (
    <div className="app-container">
      {!hideLayout && <Header />}

      <main className="main-content">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default MainLayout;