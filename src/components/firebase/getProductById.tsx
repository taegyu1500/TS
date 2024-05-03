import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getProductById(id: string) {
  const docRef = doc(db, "PRODUCT", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return {};
  return { id: docSnap.id, ...docSnap.data() };
}
