import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import FirebaseImage from "@/components/common/firebaseImage";
import Product from "@/type/Product";
import { useEffect, useState } from "react";
import getProductById from "@/components/firebase/getProductById";
import addShoppingList from "@/components/firebase/addShoppingList";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

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
              FirebaseImage(fetchedProduct.id?.toString() ?? "", image) // Added null check before calling toString()
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
    <Card>
      <CardHeader>{images}</CardHeader>
      <CardContent>
        <p>{product.productQuantity}</p>
        <p>{product.productDescription}</p>
        <button onClick={handleAddShoppingList}>구매하기</button>
      </CardContent>
    </Card>
  );
};

export default ProductDetailPage;
