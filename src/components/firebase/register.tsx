import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import registerDB from "./registerDB";
const register = async (
  email: string,
  password: string,
  nickname: string,
  isSeller: boolean
) => {
  try {
    console.log("register", email, password, nickname, isSeller);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        registerDB({
          email: email,
          password: password,
          nickname: nickname,
          isSeller: isSeller,
          id: userCredential.user.uid,
        });
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

export default register;
