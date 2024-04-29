import { downloadImage } from "../firebase/downloadImage";

const FirebaseImage = async (uid: string, name: string) => {
  const filePath = `product/${uid}/${name}`;
  const image = await downloadImage(filePath);
  return <img src={image} alt={name} />;
};

export default FirebaseImage;
