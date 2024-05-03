import ProductList from "@/components/dataVisual/ProductList";
import getProduct from "@/components/firebase/getProduct";
import Product from "@/type/Product";
import { useEffect, useState } from "react";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type as Product[]
  useEffect(() => {
    getProduct().then((data) => {
      if (data) {
        console.log(data);
        setProducts([data] as Product[]);
      }
    });
  }, []);
  return <ProductList products={products} />;
}
