import ProductList from "@/components/dataVisual/ProductList";
import { getProduct } from "@/util/firebaseFunctions";
import Product from "@/type/Product";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardListLayout from "@/layouts/cardListLayout";
import { useAuth } from "@/hook/useAuth";
import SortOptions from "@/components/dataVisual/sortOptions";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [listType, setListType] = useState<"list" | "card">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPagingCount, setSelectedPagingCount] = useState<number>(10);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { isSeller } = useAuth();

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getProduct().then(([data]) => {
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
        // setTotalPage(Math.ceil(data.length / pagingSize));
        // setPagingData(data.slice(0, pagingSize));
        // setCurrentPage(1);
      }
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setTarget(scrollRef.current);
    }
  }, [scrollRef]);

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

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver();
      observer.observe(target);
    }
  }, [target]);

  useEffect(() => {
    getProduct(selectedPagingCount).then(([data]) => {
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    });
  }, [selectedPagingCount]);

  const resetProduct = () => {
    setFilteredProducts(products);
    setSelectedCategory("");
  };

  const optionChange = (option: string) => {
    setSelectedCategory(option);
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
        {isSeller && (
          <div>
            <h2>판매자 전용 기능</h2>
            <Button onClick={() => navigate("/product/register")}>
              상품 등록
            </Button>
          </div>
        )}
      </div>
      {listType === "list" && (
        <div className="flex-grow">
          <SortOptions
            optionType="list"
            selectedSortOption={selectedCategory}
            setSelectedSortOption={optionChange}
            filterProduct={filterProduct}
            resetProduct={resetProduct}
            selectedPagingCount={selectedPagingCount}
            setSelectedPagingCount={setSelectedPagingCount}
          />
          <ProductList products={filteredProducts} />
        </div>
      )}
      {listType === "card" && (
        <div>
          <div className="flex w-full">
            <SortOptions
              optionType="card"
              selectedSortOption={selectedCategory}
              setSelectedSortOption={optionChange}
              filterProduct={filterProduct}
              resetProduct={resetProduct}
              selectedPagingCount={selectedPagingCount}
              setSelectedPagingCount={setSelectedPagingCount}
            />
            <div className="w-3/4 p-4 flex flex-wrap flex-row">
              <CardListLayout products={filteredProducts} />
            </div>
          </div>
          <div ref={scrollRef} className="w-full h-1 bg-red-500"></div>
        </div>
      )}
    </div>
  );
}
