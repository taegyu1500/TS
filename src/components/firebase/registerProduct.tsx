import { addDoc, collection } from "@firebase/firestore";
import { db, auth } from "@/firebase";
import Product from "@/type/Product";

const registerProduct = async (data: {
  description: string;
  quantity: number;
  Images: string[];
  category: string;
  price: number;
  name: string;
}) => {
  if (!auth.currentUser) return;
  const user = auth.currentUser.uid;
  const product: Product = {
    productDescription: data.description,
    productQuantity: data.quantity,
    productImage: data.Images,
    sellerId: user,
    productCategory: data.category as Product["productCategory"],
    productPrice: data.price,
    productName: data.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const docRef = await addDoc(collection(db, "PRODUCT"), { ...product });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default registerProduct;
