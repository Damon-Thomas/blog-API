import { Outlet } from "react-router-dom";
import HeaderBar from "../Header/HeaderBar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="layoutWideContainer w-screen flex justify-center items-start bg-darkprimary overflow-clip">
      <div className="layoutMain p-4 md:p-6 lg:p-8 mainBody flex flex-col content-start w-screen max-w-5xl min-h-screen overflow-auto bg-darkprimary shadow-md mb-10">
        <HeaderBar />
        <main className="flex flex-col w-full h-[calc(100vh-112px)]">
          <Outlet />
        </main>
        <Toaster position="bottom-right"></Toaster>
      </div>
    </div>
  );
}
