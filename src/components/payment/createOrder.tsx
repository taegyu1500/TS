import Order from "@/type/Order";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function createOrder(order: Order) {
  try {
    const docRef = await addDoc(collection(db, "ORDER"), {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
