import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LogInForm } from "./loginForm";

export default function LogInDialog() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()} size={"lg"} variant={"default"}>
          Log In
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="log-in-dialog-description">
        <DialogTitle className="text-4xl font-bold text-darkprimary">Log In</DialogTitle>
        <DialogDescription id="log-in-dialog-description">
          Please enter your username and password to log in.
        </DialogDescription>
        <LogInForm />
      </DialogContent>
    </Dialog>
  );
}
