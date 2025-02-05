// "use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DropdownHeaderContent from "./DropdownHeaderContent";

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
        <DropdownMenuContent
          className="w-56 DropdownMenuContent"
          side="bottom"
          sideOffset={0}
        >
          <DropdownHeaderContent />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
