import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export function ConfirmDelete() {
  const postId = useLocation().pathname.split("/posts/").pop();

  async function deletePost() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_URL}/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        console.log("Post deleted successfully", res);
        toast("Post deleted successfully", {
          position: "bottom-right",
        });
        window.location.href = "/posts";
      } else {
        console.log("Failed to delete post", res);
        toast("Failed to delete post", {
          position: "bottom-right",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-full md:text-xl font-bold">
          Delete Post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post, its comments, and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deletePost}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
