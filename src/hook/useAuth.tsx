import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { checkUserSeller } from "@/util/firebaseFunctions";
import { auth } from "@/firebase";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        checkUserSeller().then((result) => {
          setIsSeller(result);
        });
      } else {
        setIsSeller(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const isLogged = currentUser !== null;

  const logout = () => auth.signOut();

  return { currentUser, isLogged, logout, isSeller };
};
