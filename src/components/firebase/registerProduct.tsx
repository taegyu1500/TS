import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/firebase";
import Product from "@/type/Product";

const registerProduct = async ({ product }: { product: Product }) => {
  try {
    const docRef = await addDoc(collection(db, "product"), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default registerProduct;
