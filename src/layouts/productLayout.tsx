import React from "react";
import { Product } from "@/types/product";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import downloadImage from "@/components/firebase/downloadImage";
import ImagePath from "@/util/imagePath";

interface ProductLayoutProps {
  product: Product;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  return (
    <Card>
      <CardHeader>
        {product.file &&
          product.file.map((file, index) => (
            <img
              key={index}
              src={downloadImage(ImagePath(file))}
              alt={product.name}
            />
          ))}
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
    </Card>
  );
};
