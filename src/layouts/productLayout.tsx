import React, { useState, useEffect } from "react";
import Product from "@/type/Product";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import FirebaseImage from "@/components/common/firebaseImage";

interface ProductLayoutProps {
  product: Product;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  const [images, setImages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageElements = await Promise.all(
        product.productImage.map((image) =>
          FirebaseImage((product.id ?? "").toString(), image.toString())
        )
      );
      setImages(imageElements);
    };

    fetchImages();
  }, [product]);

  return (
    <Card>
      <CardHeader>{images}</CardHeader>
      <CardContent>
        <p>{product.productQuantity}</p>
        <p>{product.productDescription}</p>
      </CardContent>
    </Card>
  );
};

export default ProductLayout;
