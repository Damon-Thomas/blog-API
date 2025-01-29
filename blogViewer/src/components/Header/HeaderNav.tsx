import {
    NavigationMenu,
    NavigationMenuList,
  } from "../ui/navigation-menu";

import NavButtons from "./NavButtons";



export default function HeaderNav() {
  return (
    <div className="mobile hidden md:block lg:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavButtons />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
