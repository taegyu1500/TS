import { auth } from "@/firebase";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";

const login = async (email: string, password: string) => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      console.log("errorCode", error.code);
      console.log("errorMessage", error.message);
    });
};
export default login;
