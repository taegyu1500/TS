import { db } from "@/firebase";
import Product from "@/type/Product";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function callShoppingList(user1: string) {
  const productCollection = collection(db, "SHOPPING_LIST");
  const q = query(productCollection, where("owner", "==", user1));
  const products: Product[] = [];
  try {
    const productSnapshot = await getDocs(q);
    productSnapshot.forEach((doc) => {
      products.push(doc.data() as Product);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return products;
}
