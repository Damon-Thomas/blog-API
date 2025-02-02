import { useEffect } from "react";
import { loggedInVerifier } from "@/userControls";
import LogoutButton from "./LogoutButton";
import ToCreatePage from "./ToCreatePage";
import SignUpDialog from "./SignUpDialog";
import LogInDialog from "./LogInDialog";
import { useAuth } from "@/context/AuthContext";

export default function NavButtons() {
  const { loggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const user = await loggedInVerifier();
        setLoggedIn(!!user);
      } catch (error) {
        // user not verified
        setLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, [setLoggedIn]);

  if (loggedIn === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return loggedIn ? (
    <>
      <LogoutButton variant={'secondary'} />
      <ToCreatePage />
    </>
  ) : (
    <>
      <LogInDialog />
      <SignUpDialog />
    </>
  );
}



