import { serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import Product from "@/type/Product";

const updateDB = async (docId: string, data: Product) => {
  try {
    const docRef = doc(db, `PRODUCT/${docId}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export { updateDB };
