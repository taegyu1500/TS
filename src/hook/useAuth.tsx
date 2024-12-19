import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isLogged = currentUser !== null;
  return { currentUser, isLogged };
};
