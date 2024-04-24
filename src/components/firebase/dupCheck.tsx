import { db } from "@/firebase";

import { collection, query, where, getDocs } from "firebase/firestore";

const dupCheck = async (data: string, type: string) => {
  const q = query(collection(db, "USER"), where(type, "==", data));
  if ((await getDocs(q)).docs.length > 0) {
    return true;
  }
  return false;
};

export default dupCheck;
