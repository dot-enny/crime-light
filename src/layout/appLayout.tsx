import { Outlet } from "react-router";
import Header from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
