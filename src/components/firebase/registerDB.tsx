import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/firebase";

const registerDB = async (data: {
  email: string;
  password: string;
  id: number | string;
  nickname: string;
  isSeller: boolean;
}) => {
  try {
    const docRef = await addDoc(collection(db, "USER"), {
      email: data.email,
      password: data.password,
      id: data.id,
      nickname: data.nickname,
      isSeller: data.isSeller,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default registerDB;
