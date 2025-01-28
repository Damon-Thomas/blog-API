import { useEffect, useState } from "react";
import { loggedInVerifier } from "@/userControls";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import ToCreatePage from "./ToCreatePage";
import SignUpDialog from "./SignUpDialog";
import LogInDialog from "./LogInDialog";

export default function DropdownHeaderContent() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const user = await loggedInVerifier();
        setLoggedIn(!!user);
      } catch (error) {
        //user not verified
        setLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return loggedIn ? (
    <>
      <DropdownMenuLabel>Authentication</DropdownMenuLabel>
      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
        <LogoutButton variant={"secondary"} />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Content Creation</DropdownMenuLabel>
      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
        <ToCreatePage />
      </DropdownMenuItem>
    </>
  ) : (
    <>
      <DropdownMenuLabel>Authentication</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
        <SignUpDialog />
      </DropdownMenuItem>
      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
        <LogInDialog />
      </DropdownMenuItem>
    </>
  );
}



