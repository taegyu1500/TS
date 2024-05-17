import { downloadImage } from "@/util/firebaseFunctions";

type ImageSize = "original" | "normal" | "thumbnail";

const FirebaseImage = async (uid: string, name: string, size: ImageSize) => {
  const filePath = `PRODUCT/${uid}/${name}`;
  console.log(filePath);
  const image = await downloadImage(filePath);

  let width, height;
  switch (size) {
    case "original":
      width = "auto";
      height = "auto";
      break;
    case "normal":
      width = "500px";
      height = "auto";
      break;
    case "thumbnail":
      width = "100px";
      height = "auto";
      break;
  }

  return (
    <img src={image} alt={name} key={filePath} style={{ width, height }} />
  );
};

export default FirebaseImage;
