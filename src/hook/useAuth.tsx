import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { checkUserSeller } from "@/util/firebaseFunctions";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isLogged = currentUser !== null;

  const isSeller = checkUserSeller().then((result) => result) ?? false;

  const logout = () => auth.signOut();
  return { currentUser, isLogged, logout, isSeller };
};
