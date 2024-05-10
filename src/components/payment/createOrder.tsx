import Order from "@/type/Order";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function createOrder({
  sellerId,
  buyerId,
  productQuantity,
  Status,
  id,
  ...rest
}: Order) {
  try {
    const docRef = await addDoc(collection(db, "ORDER"), {
      sellerId,
      buyerId,
      id,
      productQuantity,
      Status,
      ...rest,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
