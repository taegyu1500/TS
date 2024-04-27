import { getDownloadURL, getStorage } from "firebase/storage";

export const downloadImage = async (path: string) => {
  const storage = getStorage();
  const url = await getDownloadURL(storage.ref(path));
  return url;
};
