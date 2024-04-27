import { getStorage, ref, uploadBytes } from "firebase/storage";

const uploadFiles = async (files: File[] | undefined, uid: string) => {
  const storage = getStorage();
  let storageRefs = [];

  if (files) {
    for (let file of files) {
      const storageRef = ref(storage, `product/${uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      storageRefs.push(storageRef);
    }
  }
};
