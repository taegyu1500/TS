import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Product from "@/type/Product";

const getProduct = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "PRODUCT")));
    console.log(querySnapshot);
    if (querySnapshot.empty) return [];
    const data: Product[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as Product);
    });
    return data;
  } catch (error) {
    console.error("Error getting product: ", error);
    throw error;
  }
};

export default getProduct;
