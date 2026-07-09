import { Outlet } from "react-router-dom";
import FloatingActionButton from "@/components/FloatingActionButton";

export const Layout = () => {
  return (
    <>
      <Outlet />
      <FloatingActionButton />
    </>
  );
};
