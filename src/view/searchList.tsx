import ProductList from "@/components/dataVisual/ProductList";
import { searchProductList } from "@/util/firebaseFunctions";
import Product from "@/type/Product";
import { useEffect, useState } from "react";
import { checkUserSeller } from "@/util/firebaseFunctions";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "@/firebase";

export default function SearchList() {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type as Product[]
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const navigate = useNavigate();
  const { keyword } = useParams();
  useEffect(() => {
    console.log(keyword);
    if (!keyword) return; // Add a check to ensure that the keyword is not undefined
    searchProductList(keyword).then((data) => {
      if (data) {
        console.log(data);
        setProducts(data);
      }
    });
  }, [keyword]); // Update the dependency array to include keyword
  useEffect(() => {
    if (!isSeller || auth.currentUser === null) return; // Replace '=' with '==='
    checkUserSeller().then((data) => {
      setIsSeller(data);
    });
  }, [isSeller]);
  return (
    <div className="flex flex-col w-full h-full box-border">
      <div className="flex-grow">
        <ProductList products={products} />
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
