import { getDownloadURL, getStorage, ref } from "firebase/storage";

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
