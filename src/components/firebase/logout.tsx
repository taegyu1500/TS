import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const logout = async () => {
  try {
    await signOut(auth)
      .then(() => {
        console.log("logout");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("errorCode", error.code);
        console.log("errorMessage", error.message);
      });
  } catch (error) {
    console.error(error);
  }
};

export default logout;
