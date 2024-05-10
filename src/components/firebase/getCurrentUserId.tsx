import { auth, db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

async function getCurrentUserId() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not found");
  }

  const q = query(collection(db, "USER"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  let userId = "";
  querySnapshot.forEach((doc) => {
    userId = doc.id;
  });

  return userId;
}

export default getCurrentUserId;
