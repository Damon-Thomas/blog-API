import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";


export default function LogoutButton({ variant }: { variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined } = { variant: "default" }) {
    const { setLoggedIn } = useAuth();
  function logout() {
        // Implement the logout logic here
        localStorage.removeItem("token");
        setLoggedIn(false);
        toast(`Logged out`, { position: "bottom-right" });
      }
    
    return (
        <Button size={'lg'} variant={variant} onClick={logout}>
        Log Out
      </Button>
    )
};
 
