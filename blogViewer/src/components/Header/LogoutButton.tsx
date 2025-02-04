import { useContext } from "react";
import { Button } from "../ui/button";
import { contextLogout, CurrentUserContext } from "@/context/AuthContext";

export default function LogoutButton(
  {
    variant,
  }: {
    variant:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
  } = { variant: "default" }
) {
  const { setUser } = useContext(CurrentUserContext);
  function onClickHandler() {
    contextLogout(setUser);
  }
  return (
    <Button size={"lg"} variant={variant} onClick={onClickHandler}>
      Log Out
    </Button>
  );
}
