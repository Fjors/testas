import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AppLayout;
