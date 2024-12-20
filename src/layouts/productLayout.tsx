import { useState, useEffect } from "react";
import Product from "@/type/Product";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FirebaseImage from "@/components/common/firebaseImage";
import { useNavigate } from "react-router-dom";
import PriceFormat from "@/view/fragmentPages/priceFormat";

interface ProductLayoutProps {
  product: Product;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  const [images, setImages] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const imageElements = await Promise.all(
        product.productImage.map((image) =>
          FirebaseImage(
            (product.id ?? "").toString(),
            image.toString(),
            "normal"
          )
        )
      );
      setImages(imageElements);
    };

    fetchImages();
  }, [product]);

  return (
    <Card
      className={"w-1/5 flex flex-col justify-between m-2 hover:cursor-pointer"}
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <CardHeader>{images}</CardHeader>
      <CardContent>
        <p className="overflow-ellipsis">{product.productName}</p>
      </CardContent>
      <CardFooter>
        <PriceFormat price={product.productPrice} />
      </CardFooter>
    </Card>
  );
};

export default ProductLayout;
