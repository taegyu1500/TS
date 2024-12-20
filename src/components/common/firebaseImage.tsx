import { downloadImage } from "@/util/firebaseFunctions";

type ImageSize = "original" | "normal" | "thumbnail";

const FirebaseImage = async (
  uid: string,
  name: string,
  size: ImageSize,
  type: string = "PRODUCT"
) => {
  const filePath = `${type}/${uid}/${name}`;
  console.log(filePath);
  const image = await downloadImage(filePath);
  if (image === null || image === undefined)
    return <img src={`https://picsum.photos/seed/${name}/150/100`} />;
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
