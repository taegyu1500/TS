import ProductList from "@/components/dataVisual/ProductList";
import { getProduct, getProductsByPage } from "@/util/firebaseFunctions";
import Product from "@/type/Product";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { isSeller } = useAuth();

  useEffect(() => {
    getProduct().then(([data]) => {
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
        setTotalPage(Math.ceil(data.length / selectedPagingCount));
        setCurrentPage(1);
      }
    });
  }, [selectedPagingCount]);

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

  const scrollLoad = useCallback(() => {
    console.log("scrollLoad");
    if (currentPage < totalPage) {
      getProductsByPage(currentPage + 1, selectedPagingCount).then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data) && data.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...data]);
          setFilteredProducts((prevFilteredProducts) => [
            ...prevFilteredProducts,
            ...data,
          ]);
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
    }
  }, [currentPage, totalPage, selectedPagingCount]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        scrollLoad();
      }
    });

    const currentRef = scrollRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [scrollLoad]);

  useEffect(() => {
    getProduct(selectedPagingCount).then(([data]) => {
      if (Array.isArray(data)) {
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
            setSelectSortOption={optionChange}
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
              setSelectSortOption={optionChange}
              filterProduct={filterProduct}
              resetProduct={resetProduct}
              selectedPagingCount={selectedPagingCount}
              setSelectedPagingCount={setSelectedPagingCount}
            />
            <div className="w-4/5 p-4 flex flex-wrap flex-row">
              <CardListLayout products={filteredProducts} />
            </div>
          </div>
          <div ref={scrollRef} className="w-full h-1 bg-red-500"></div>
        </div>
      )}
    </div>
  );
}
