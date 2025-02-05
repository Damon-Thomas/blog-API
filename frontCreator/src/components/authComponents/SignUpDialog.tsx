import { SignUpForm } from "./signupForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function SignUpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          size={"lg"}
          variant={"secondary"}
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-4xl font-bold text-darkprimary">
          Sign Up
        </DialogTitle>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
