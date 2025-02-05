import { useEffect, useState } from "react";
import { loggedInVerifier } from "@/userControls";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import ToCreatePage from "./ToCreatePage";
import SignUpDialog from "./SignUpDialog";
import LogInDialog from "./LogInDialog";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "./HomeIcon";
import { Button } from "../ui/button";

export default function DropdownHeaderContent() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const { id } = useParams();

  function MakeHomeIcon() {
    if (id != undefined) {
      return (
        <>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to="/">
              <Button variant={"ghost"} size={"lg"}>
                Home
              </Button>
            </Link>
          </DropdownMenuItem>
        </>
      );
    }
    return;
  }

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
      <MakeHomeIcon />
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
