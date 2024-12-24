import ProductList from "@/components/dataVisual/ProductList";
import getProduct from "@/components/firebase/getProduct";
import Product from "@/type/Product";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardListLayout from "@/layouts/cardListLayout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hook/useAuth";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [listType, setListType] = useState<"list" | "card">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();
  const { isSeller } = useAuth();
  // const [isSeller, setIsSeller] = useState<boolean>(false);
  console.log(isSeller);
  useEffect(() => {
    getProduct().then((data) => {
      if (data) {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      }
    });
  }, []);

  const filterProduct = (category: string | null) => {
    if (category) {
      const filtered = products.filter(
        (product) => product.productCategory === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // 카테고리가 선택되지 않은 경우 전체 제품 목록을 설정
    }
  };

  const resetProduct = () => {
    setFilteredProducts(products);
    setSelectedCategory("");
  };

  return (
    <div className="flex flex-col w-full h-full box-border">
      <div className="flex justify-center">
        <Button
          onClick={() => {
            setListType("card");
          }}
        >
          카드
        </Button>
        <Button
          onClick={() => {
            setListType("list");
          }}
        >
          리스트
        </Button>
      </div>
      {listType === "list" && (
        <div className="flex-grow">
          <div>
            <Card>
              <CardTitle className="ml-5 mt-5 mb-5">상세 검색</CardTitle>
              <CardContent>
                {/* 타입구별할 것 */}
                <div className="flex flex-col flex-1">
                  <div className="flex flex-row items-center w-full">
                    <p className="mr-4 w-20">종류</p> {/* 고정 너비 설정 */}
                    <RadioGroup
                      className="flex flex-row flex-wrap flex-grow"
                      value={selectedCategory}
                      onValueChange={(value) => setSelectedCategory(value)}
                    >
                      {[
                        "의류",
                        "가전제품",
                        "가구",
                        "생활용품",
                        "식품",
                        "기타",
                      ].map((category) => (
                        <div className="flex items-center mr-4" key={category}>
                          <RadioGroupItem id={category} value={category} />
                          <Label htmlFor={category} className="ml-2">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => filterProduct(selectedCategory)}>
                  검색
                </Button>
                <Button onClick={() => resetProduct()}>초기화</Button>
              </CardFooter>
            </Card>
          </div>
          <ProductList products={filteredProducts} />
        </div>
      )}
      {listType === "card" && (
        <div className="flex w-full">
          <div className="w-1/4 p-4 flex flex-col">
            <Card>
              <CardTitle className="ml-5 mt-5">상세 검색</CardTitle>
              <CardContent>
                {/* 타입구별할 것 */}
                <div className="flex flex-col flex-1">
                  <div className="flex flex-row items-center w-full">
                    <RadioGroup
                      className="flex flex-col flex-wrap flex-grow mt-4"
                      value={selectedCategory}
                      onValueChange={(value) => setSelectedCategory(value)}
                    >
                      {[
                        "의류",
                        "가전제품",
                        "가구",
                        "생활용품",
                        "식품",
                        "기타",
                      ].map((category) => (
                        <div
                          className="flex flex-items-center mr-4"
                          key={category}
                        >
                          <RadioGroupItem id={category} value={category} />
                          <Label htmlFor={category} className="ml-2">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => filterProduct(selectedCategory)}>
                  검색
                </Button>
                <Button onClick={() => resetProduct()}>초기화</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="w-3/4 p-4 flex flex-wrap flex-row">
            <CardListLayout products={filteredProducts} />
          </div>
        </div>
      )}
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
