// "use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignUpDialog from "./SignUpDialog";
import LogInDialog from "./LogInDialog";



export function DropDownMobileMenu() {

  return (
    <div className="mobile block md:hidden lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            <svg
            
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 DropdownMenuContent" side="bottom" sideOffset={0}>
          <DropdownMenuLabel>Authentication</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <SignUpDialog />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
            <LogInDialog /> 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}