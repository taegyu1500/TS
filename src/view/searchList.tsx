import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "@/components/dataVisual/ProductList";
import { searchProductList, checkUserSeller } from "@/util/firebaseFunctions";
import Product from "@/type/Product";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";

export default function SearchList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const navigate = useNavigate();
  const { keyword } = useParams();

  useEffect(() => {
    console.log(keyword);
    if (!keyword) return;
    searchProductList(keyword).then((data) => {
      if (data) {
        console.log(data);
        setProducts(data);
      }
    });
  }, [keyword]);

  useEffect(() => {
    if (!isSeller || auth.currentUser === null) return;
    checkUserSeller().then((data) => {
      setIsSeller(data);
    });
  }, [isSeller]);

  return (
    <div className="flex flex-col w-full h-full box-border">
      <div className="flex-grow">
        {keyword && <ProductList products={products} />}
      </div>
      {isSeller && (
        <div>
          <h2>판매자 전용 기능</h2>
          <Button onClick={() => navigate("/product/register")}>
            상품 등록
          </Button>
        </div>
      )}
    </div>
  );
}
