import { Toaster } from "sonner";
import { DropDownMobileMenu } from "./HeaderDropD";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";

export default function HeaderBar() {
  return (
    <div className="headerBar backdrop-blur-sm  sticky top-0 h-16 p-2 bg-opaqueWhite flex px-4 rounded-md justify-between shadow-xl border-[1px] border-primary">
      <Logo />
      <div className="headerRight flex justify-end items-center">
        <DropDownMobileMenu />
        <HeaderNav />
      </div>
    </div>
  );
}
