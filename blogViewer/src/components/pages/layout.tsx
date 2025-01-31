import { Outlet } from "react-router-dom";
import HeaderBar from "../Header/HeaderBar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="p-4 md:p-6 lg:p-8 mainBody flex flex-col content-start w-screen min-h-screen overflow-auto">
      <HeaderBar />
      <main className="flex flex-col w-full h-96">
        <Outlet />
      </main>
      <Toaster position="bottom-right"></Toaster>
    </div>
  );
}
