const ImagePath = (uid: string, fileName: string) => {
  const modifiedFilePath = `product/${uid}/${fileName}`;
  return modifiedFilePath;
};

export default ImagePath;
