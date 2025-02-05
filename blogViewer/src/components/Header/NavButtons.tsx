import { useContext, useEffect } from "react";
import { loggedInVerifier } from "@/userControls";
import LogoutButton from "./LogoutButton";
import ToCreatePage from "./ToCreatePage";
import SignUpDialog from "./SignUpDialog";
import LogInDialog from "./LogInDialog";
import { CurrentUserContext } from "@/context/AuthContext";
import HomeIcon from "./HomeIcon";
import { useParams } from "react-router-dom";

export default function NavButtons() {
  const { user } = useContext(CurrentUserContext);
  const { id } = useParams();
  console.log("param", id);

  // useEffect(() => {
  //   async function checkLoggedIn() {
  //     try {
  //       const user = await loggedInVerifier();
  //       setLoggedIn(!!user);
  //     } catch (error) {
  //       // user not verified
  //       setLoggedIn(false);
  //     }
  //   }
  //   checkLoggedIn();
  // }, [setLoggedIn]);

  // if (loggedIn === null) {
  //   return <div>Loading...</div>; // or a loading spinner
  // }

  // return loggedIn ? (

  function MakeHomeIcon() {
    if (id != undefined) {
      return <HomeIcon />;
    }
    return;
  }

  return user ? (
    <>
      <MakeHomeIcon />
      <LogoutButton variant={"secondary"} />
      <ToCreatePage />
    </>
  ) : (
    <>
      <MakeHomeIcon />
      <LogInDialog />
      <SignUpDialog />
    </>
  );
}
