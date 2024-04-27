import { getStorage, ref, uploadBytes } from "firebase/storage";

const uploadFiles = async (files: FileList | undefined, uid: string) => {
  const storage = getStorage();
  const storageRefs = [];

  if (files) {
    for (const file of files) {
      const storageRef = ref(storage, `product/${uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      storageRefs.push(storageRef);
    }
  }
};

export { uploadFiles };
