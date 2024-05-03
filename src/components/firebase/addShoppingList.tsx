import { db } from "@/firebase";
import Product from "@/type/Product";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { callShoppingList } from "./callShopingList";

export async function addShoppingList(product: Product, user: string) {
  try {
    const data = await callShoppingList(user);
    const quantity = data && data.length ? data.length + 1 : 1;
    await addDoc(collection(db, "SHOPPING_LIST"), {
      ...product,
      owner: user,
      quantity: quantity,
      date: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
}

export default addShoppingList;
