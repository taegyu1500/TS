import { downloadImage } from "../firebase/downloadImage";

const FirebaseImage = async (uid: string, name: string) => {
  const filePath = `PRODUCT/${uid}/${name}`;
  console.log(filePath);
  const image = await downloadImage(filePath);
  return <img src={image} alt={name} key={filePath} />;
};

export default FirebaseImage;
