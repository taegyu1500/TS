import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const getProduct = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "product")));
    if (querySnapshot.empty) return {};
    let data = {};
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return data;
  } catch (error) {
    console.error("Error getting product: ", error);
    throw error;
  }
};

export default getProduct;
