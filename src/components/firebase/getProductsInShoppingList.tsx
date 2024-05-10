import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Product from "@/type/Product";
import { auth } from "@/firebase";

async function getProductsInShoppingList() {
  const q = query(
    collection(db, "SHOPPING_LIST"),
    where("owner", "==", auth.currentUser)
  );
  const querySnapshot = await getDocs(q);
  const products = [] as Product[];
  querySnapshot.forEach((doc) => {
    products.push(doc.data() as Product);
  });
  return products;
}

export default getProductsInShoppingList;
