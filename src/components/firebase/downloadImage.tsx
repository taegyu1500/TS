import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const downloadImage = async (path: string) => {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, path));
  return url;
};
