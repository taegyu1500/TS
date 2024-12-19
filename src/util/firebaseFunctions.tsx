import { auth, db } from "@/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Product from "@/type/Product";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import Shopping from "@/type/Shopping";

export async function addShoppingList(product: Product, user: string) {
  try {
    const data = await callShoppingList(user);
    const existingProduct = data.find(
      (item: Product) => item.id === product.id
    );

    if (existingProduct) {
      console.log("Product already exists in the shopping list.");
      return;
    }

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

export async function callShoppingList(user: string) {
  const productCollection = collection(db, "SHOPPING_LIST");
  const q = query(productCollection, where("owner", "==", user));
  const products: Shopping[] = [];
  try {
    const productSnapshot = await getDocs(q);
    productSnapshot.forEach((doc) => {
      const shopping = doc.data() as Shopping;
      products.push(shopping);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return products;
}

export async function callProductList(lastDoc: number | 0) {
  const productCollection = collection(db, "PRODUCT");
  const q = query(
    productCollection,
    orderBy("date", "desc"),
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

export async function searchProductList(search: string) {
  const productCollection = collection(db, "PRODUCT");
  const q = query(productCollection, where("productName", ">=", search));
  const productSnapshot = await getDocs(q);
  const products: Product[] = [];
  productSnapshot.forEach((doc) => {
    products.push(doc.data() as Product);
  });
  return products;
}

export const downloadImage = async (path: string) => {
  try {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (error) {
    console.error("Error downloading image: ", error);
    throw error;
  }
};

export const dupCheck = async (data: string, type: string) => {
  const q = query(collection(db, "USER"), where(type, "==", data));
  if ((await getDocs(q)).docs.length > 0) {
    return true;
  }
  return false;
};

export async function getCurrentUserId() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not found");
  }

  const q = query(collection(db, "USER"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  let userId = "";
  querySnapshot.forEach((doc) => {
    userId = doc.id;
  });

  return userId;
}

export const getProduct = async () => {
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

export async function getProductById(id: string) {
  const docRef = doc(db, "PRODUCT", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return {};
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getProductsInShoppingList() {
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

export async function getUser(uid: string) {
  const docRef = doc(db, `user/${uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const login = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("login", browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("errorCode", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth)
      .then(() => {
        console.log("logout");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("errorCode", error.code);
        console.log("errorMessage", error.message);
      });
  } catch (error) {
    console.error(error);
  }
};
type sortingOptions = "date" | "price" | "quantity";

export async function callProduct(
  lastDoc: number | 0,
  sorting: sortingOptions
) {
  const productCollection = collection(db, "PRODUCT");
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

export const register = async (
  email: string,
  password: string,
  nickname: string,
  isSeller: boolean
) => {
  try {
    console.log("register", email, password, nickname, isSeller);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        registerDB({
          email: email,
          password: password,
          nickname: nickname,
          isSeller: isSeller,
          id: userCredential.user.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        // ..
      });
  } catch (error) {
    console.error(error);
  }
};

export const registerDB = async (data: {
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

export const registerProduct = async (data: {
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

export const updateDB = async (docId: string, data: Product) => {
  try {
    const docRef = doc(db, `PRODUCT/${docId}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const updateUser = async (uid: string, data: User) => {
  try {
    const docRef = doc(db, `USER/${uid}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const uploadFiles = async (files: FileList | undefined, uid: string) => {
  const storage = getStorage();
  const storageRefs = [];

  if (files) {
    for (const file of files) {
      const storageRef = ref(storage, `PRODUCT/${uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      storageRefs.push(storageRef);
    }
  }
};

export const updateShoppingQuantity = async (id: string, delta: number) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "SHOPPING_LIST"), where("id", "==", id))
    );
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      quantity: querySnapshot.docs[0].data().quantity + delta,
    });
    console.log("Document updated with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteShoppingList = async (id: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "SHOPPING_LIST"), where("id", "==", id))
    );
    const docRef = querySnapshot.docs[0].ref;
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export const checkUserSeller = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not found");
  }

  const q = query(collection(db, "USER"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  let isSeller = false;
  querySnapshot.forEach((doc) => {
    isSeller = doc.data().isSeller;
  });

  return isSeller;
};

export const googleLogin = async () => {
  return signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(user, token);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};
