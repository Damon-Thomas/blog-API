
import { Toaster } from "sonner";
import { DropDownMobileMenu } from "./HeaderDropD";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";

export default function HeaderBar() {
  return (
    <div className="headerBar sticky h-16 bg-white flex px-4 rounded-md justify-between">
      <Logo />
      <div className="headerRight flex justify-end items-center">
        <DropDownMobileMenu />
        <HeaderNav />
        <Toaster position="bottom-right"></Toaster>
      </div>
    </div>
  );
}
