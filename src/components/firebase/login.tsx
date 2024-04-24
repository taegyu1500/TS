import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async (email: string, password: string) => {
  console.log("login", email, password);
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("login userCredential", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        // ..
      });
  } catch (error) {
    console.error(error);
  }
};

export default login;
