import imageCompression from "browser-image-compression";

export const resizeImage = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
