import { db } from "@/firebase";
import Product from "@/type/Product";
import {
  getDocs,
  collection,
  orderBy,
  limit,
  query,
  startAfter,
} from "firebase/firestore";

type sortingOptions = "date" | "price" | "quantity";

export async function callProduct(
  lastDoc: number | 0,
  sorting: sortingOptions
) {
  const productCollection = collection(db, "product");
  const q = query(
    productCollection,
    orderBy(sorting, "desc"),
    startAfter(lastDoc),
    limit(5)
  );
  const productSnapshot = await getDocs(q);
  const products: Product[] = [];
  productSnapshot.forEach((doc) => {
    products.push(doc.data() as Product);
  });
  return products;
}
