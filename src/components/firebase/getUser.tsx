import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const getUser = async (uid: string) => {
  const docRef = doc(db, `user/${uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export default getUser;
