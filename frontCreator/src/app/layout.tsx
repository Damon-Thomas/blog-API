import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/app-sidebar";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { CurrentUserContext } from "@/context/authContext";
import { useContext } from "react";
import LogInDialog from "@/components/authComponents/LogInDialog";
import SignUpDialog from "@/components/authComponents/SignUpDialog";

// export default function Layout({ children }: { children: React.ReactNode }) {
export default function Layout() {
  const { user } = useContext(CurrentUserContext);
  console.log(user);
  return user ? (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
        <Toaster position="bottom-right"></Toaster>
      </main>
    </SidebarProvider>
  ) : (
    <div className="flex flex-col items-center justify-center bg-darkprimary w-screen h-screen p-2 md:p-8">
      <h1 className="text-center text-4xl font-bold">
        You need to be logged in to access the Modern Murmur creator
      </h1>
      <p className="p-2 font-bold">Login or Signup Below</p>
      <div className="flex gap-6 p-4">
        <LogInDialog />
        <SignUpDialog />
      </div>
    </div>
  );
}
