import { Outlet } from "react-router";

import Header from "../modules/shared/ui/components/Header.tsx";
import { Footer } from "../modules/shared/ui/components/Footer.tsx";

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
