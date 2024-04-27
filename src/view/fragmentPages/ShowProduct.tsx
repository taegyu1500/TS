import getProduct from "@/components/firebase/getProduct"; // Assuming getProducts fetches all products
import Product from "@/type/Product";
import { useEffect, useState } from "react";
import ProductLayout from "@/layouts/productLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import SkeletonLayout from "@/layouts/skeletonLayout";

const ShowProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct().then((productsData) => {
      if (productsData) {
        const data = productsData as Product[];
        setProducts(data);
      }
    });
  }, []);

  if (!products) {
    return <SkeletonLayout count={3} />;
  }

  return (
    <Card>
      <CardHeader>
        <Button onClick={() => navigate("/main")}>뒤로가기</Button>
      </CardHeader>
      <CardContent>
        {Array.isArray(products) && products.length === 0 ? (
          <p>상품이 없습니다</p>
        ) : (
          Array.isArray(products) &&
          products.map((product) => (
            <ProductLayout key={product.id} product={product} />
          ))
        )}
        {products === null && <p>데이터 확인중...</p>}
        {products === undefined && <p>상품을 불러오지 못했습니다.</p>}
        {typeof products === "object" && Object.keys(products).length === 0 && (
          <p>상품 정보가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowProducts;
