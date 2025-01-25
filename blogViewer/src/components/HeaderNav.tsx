import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "./ui/navigation-menu";
import LogInDialog from "./LogInDialog";
import SignUpDialog from "./SignUpDialog";



export default function HeaderNav() {
  return (
    <div className="mobile hidden md:block lg:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <LogInDialog />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SignUpDialog />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
