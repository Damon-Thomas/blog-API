import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";



export default function LogoutButton({ variant }: { variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined } = { variant: "default" }) {
    const { setLoggedIn } = useAuth();
  function logout() {
        // Implement the logout logic here
        localStorage.removeItem("token");
        setLoggedIn(false);
        console.log("Logged out");
        // You can also redirect the user or perform other actions as needed
      }
    
    return (
        <Button size={'lg'} variant={variant} onClick={logout}>
        Log Out
      </Button>
    )
};
 
