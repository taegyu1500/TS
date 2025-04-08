// import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();

  const handleAddShoppingList = async () => {
    if (product) {
      await addShoppingList(product, auth.currentUser?.uid ?? "").then(() => {
        toast({
          title: "장바구니에 추가되었습니다.",
          description: `${product.productName} 장바구니에 추가되었습니다.`,
        });
        navigate("/product");
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct: Product | null = (await getProductById(
        id ?? ""
      )) as Product | null;
      if (fetchedProduct && "productImage" in fetchedProduct) {
        setProduct(fetchedProduct);
        const imageElements = await Promise.all(
          fetchedProduct.productImage.map((image: string) =>
            FirebaseImage(fetchedProduct.id?.toString() ?? "", image, "normal")
          )
        );

        setImages(imageElements);
      }
    }; // Add closing parenthesis here

    fetchProduct();
  }, [id]);

  if (product === null) {
    return <div>상품을 불러오는 중입니다.</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span>뒤로가기</span>
        </Button>
      </div>
      {/* 상단 섹션: 이미지 및 주요 정보 */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* 좌측: 제품 이미지 */}
        <div className="md:w-3/5">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
            <div className="p-4">
              {images.length > 0 ? (
                <div className="relative aspect-square">{images}</div>
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                  이미지가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 우측: 제품 정보 및 구매 옵션 */}
        <div className="md:w-2/5 flex flex-col gap-4">
          {/* 제품명 및 카테고리 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-blue-600 mb-1">
              {product.productCategory}
            </div>
            <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>

            {/* 가격 정보 */}
            <div className="text-3xl font-bold text-gray-900 mb-6">
              <PriceFormat price={product.productPrice} />
            </div>

            {/* 구매 버튼 */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={handleAddShoppingList}
                className="w-full h-12 text-lg"
              >
                장바구니에 담기
              </Button>
              <Button variant="outline" className="w-full h-12 text-lg">
                바로 구매하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 섹션: 상세 정보 */}
      <div className="mt-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="border-b">
            <h2 className="text-xl font-semibold p-6">상품 상세 정보</h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">
                {product.productDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
