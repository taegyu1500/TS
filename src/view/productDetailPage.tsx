import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import FirebaseImage from "@/components/common/firebaseImage";
import Product from "@/type/Product";
import { useEffect, useState } from "react";
import getProductById from "@/components/firebase/getProductById";
import addShoppingList from "@/components/firebase/addShoppingList";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PriceFormat from "./fragmentPages/priceFormat";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();

  const handleAddShoppingList = async () => {
    if (product) {
      await addShoppingList(product, auth.currentUser?.uid ?? "").then(() => {
        console.log("장바구니에 추가되었습니다.");
        navigate("/product"); // 이 부분은 toast로 대체될 수도 있습니다
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct: Product | null = (await getProductById(
        id ?? ""
      )) as Product | null;
      if (fetchedProduct && "productImage" in fetchedProduct) {
        console.log(fetchedProduct.productImage); // Add this line
        setProduct(fetchedProduct);
        const imageElements = await Promise.all(
          fetchedProduct.productImage.map(
            (image: string) =>
              FirebaseImage(
                fetchedProduct.id?.toString() ?? "",
                image,
                "normal"
              ) // Added null check before calling toString()
          )
        );
        console.log(imageElements);
        setImages(imageElements);
      }
    }; // Add closing parenthesis here

    fetchProduct();
  }, [id]);

  if (product === null) {
    return <div>상품을 불러오는 중입니다.</div>;
  }

  return (
    <div className="flex justify-between">
      <div className="w-4/5">
        <Card>
          <CardHeader>{images}</CardHeader>
          <CardContent>
            <h2>{product.productName}</h2>
            <Card>
              <CardHeader>상세 정보</CardHeader>
              <CardContent>
                <p>{product.productDescription}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>카테고리</CardHeader>
              <CardContent>
                <p>{product.productCategory}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/5">
        <Card>
          <CardHeader>가격</CardHeader>
          <CardContent>
            <PriceFormat price={product.productPrice} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex justify-center">
              <Button onClick={handleAddShoppingList}>장바구니에 담기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
