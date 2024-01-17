import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
