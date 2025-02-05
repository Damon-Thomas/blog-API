import { loggedInVerifier } from "@/userControls";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const CurrentUserContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function verifyUser() {
      const user = await loggedInVerifier();
      setUser(user);
    }
    verifyUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const contextLogin = async (userData: any, setUser: any) => {
  // Implement your login logic here
  // const { setUser } = useContext(CurrentUserContext);

  const response = await fetch(`${import.meta.env.VITE_HOST_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const json = await response.json();

  if (json.failure) {
    return { error: json.error, failure: true };
  } else {
    localStorage.setItem("token", json.token);
    setUser(json.user);
    toast(`Logged in as user: ${json.user.username}`, {
      position: "bottom-right",
    });
    return { failure: false, user: json.user };
  }
};

export const contextLogout = (setUser: any) => {
  localStorage.removeItem("token");
  setUser(null);
  toast("Logged out", {
    position: "bottom-right",
  });
};

export const contextSignup = async (userData: any, setUser: any) => {
  const response = await fetch(`${import.meta.env.VITE_HOST_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const json = await response.json();
  console.log("JSON", json);
  if (json.errors || json.failure) {
    console.log("failure");
    return { error: json.error, failure: true };
  } else {
    localStorage.setItem("token", json.token);
    setUser(json.user);
    toast(`Sign up successful! Logged in as user: ${json.user.username}`, {
      position: "bottom-right",
    });
    return { failure: false, user: json.user };
  }
};
