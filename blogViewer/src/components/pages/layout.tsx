import { Outlet } from "react-router-dom";
import HeaderBar from "../Header/HeaderBar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="layoutWideContainer w-screen h-screen flex justify-center items-start bg-darkprimary overflow-hidden">
      <div className="layoutMain p-4 md:p-6 lg:p-8 mainBody flex flex-col w-screen max-w-5xl h-screen bg-darkprimary shadow-md overflow-auto">
        <HeaderBar />
        <main className="flex flex-col w-full flex-1 mt-4 md:mt-6">
          <Outlet />
        </main>
        <Toaster position="bottom-right"></Toaster>
      </div>
    </div>
  );
}
