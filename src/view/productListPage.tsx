import ProductList from "@/components/dataVisual/ProductList";
import { getProduct } from "@/util/firebaseFunctions";
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
  const [selectedPagingCount, setSelectedPagingCount] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { isSeller } = useAuth();

  // 스크롤 로드 함수 - 의존성 최소화
  const scrollLoad = useCallback(() => {
    if (loading || !hasMore) {
      console.log("로딩 중이거나 더 이상 데이터가 없음, 스크롤 로드 중단");
      return;
    }

    console.log(`스크롤 감지: 페이지 ${currentPage}/${totalPage}`);
    setLoading(true);

    setTimeout(() => {
      // 필터링된 데이터 소스 확보
      const dataSource = selectedCategory
        ? products.filter((p) => p.productCategory === selectedCategory)
        : products;

      // 다음 페이지 데이터 계산
      const startIdx = currentPage * selectedPagingCount;
      const endIdx = startIdx + selectedPagingCount;
      const nextPageData = dataSource.slice(
        startIdx,
        Math.min(endIdx, dataSource.length)
      );

      if (nextPageData.length > 0) {
        console.log(`${nextPageData.length}개 항목 로드 완료`);
        setFilteredProducts((prev) => [...prev, ...nextPageData]);
        setCurrentPage((prev) => prev + 1);
        setHasMore(endIdx < dataSource.length);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }, 300);
    // 의존성 배열에서 불필요한 항목 제거
  }, [
    loading,
    hasMore,
    currentPage,
    selectedPagingCount,
    selectedCategory,
    products,
  ]);

  // 초기 데이터 로드 - scrollLoad 의존성 제거
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setLoading(true);

    getProduct().then(([data]) => {
      if (Array.isArray(data)) {
        setProducts(data);

        const firstPageData = data.slice(0, selectedPagingCount);
        setFilteredProducts(firstPageData);

        const totalPages = Math.ceil(data.length / selectedPagingCount);
        setTotalPage(totalPages);
        setHasMore(data.length > selectedPagingCount);

        setLoading(false);
      }
    });
  }, [selectedPagingCount]); // scrollLoad 의존성 제거

  // 자동 로드를 위한 별도의 useEffect
  useEffect(() => {
    if (
      products.length > 0 &&
      products.length > filteredProducts.length &&
      !loading &&
      hasMore
    ) {
      const timer = setTimeout(() => {
        console.log("자동 추가 데이터 로드");
        scrollLoad();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [products.length, filteredProducts.length, loading, hasMore, scrollLoad]);

  // 필터링 함수 - 간소화
  const filterProduct = useCallback(
    (category: string | null) => {
      setCurrentPage(1);

      const filtered = category
        ? products.filter((product) => product.productCategory === category)
        : products;

      // 첫 페이지만 보여주기
      const firstPageData = filtered.slice(0, selectedPagingCount);
      setFilteredProducts(firstPageData);

      // 더 불러올 데이터가 있는지 확인
      setHasMore(filtered.length > selectedPagingCount);

      // 페이지 수 업데이트
      const totalPages = Math.ceil(filtered.length / selectedPagingCount);
      setTotalPage(totalPages);

      console.log(
        `필터링: ${filtered.length}개, 페이지: ${totalPages}, 더 있음: ${
          filtered.length > selectedPagingCount
        }`
      );

      // 필터링 후 자동 스크롤 로드 트리거
      if (filtered.length > selectedPagingCount) {
        setTimeout(() => scrollLoad(), 500);
      }
    },
    [products, selectedPagingCount, scrollLoad]
  );

  // 스크롤 감지 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          console.log("스크롤 감지됨 - 추가 데이터 로드 시작");
          scrollLoad();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    const currentRef = scrollRef.current;
    if (currentRef) {
      observer.observe(currentRef);
      console.log("인터섹션 옵저버 설정 완료");
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [scrollLoad, loading, hasMore]);

  // 리셋 함수
  const resetProduct = useCallback(() => {
    setSelectedCategory("");
    setCurrentPage(1);
    setLoading(false);

    const firstPageData = products.slice(0, selectedPagingCount);
    setFilteredProducts(firstPageData);

    setHasMore(products.length > selectedPagingCount);
    setTotalPage(Math.ceil(products.length / selectedPagingCount));

    // 리셋 후 자동 스크롤 로드 트리거
    if (products.length > selectedPagingCount) {
      setTimeout(() => scrollLoad(), 500);
    }
  }, [products, selectedPagingCount, scrollLoad]);

  return (
    <div className="flex flex-col w-full h-full box-border">
      {/* 상단 메뉴 */}
      <div className="flex justify-center gap-2 mb-4">
        <Button
          onClick={() => setListType("card")}
          variant={listType === "card" ? "default" : "outline"}
        >
          카드
        </Button>
        <Button
          onClick={() => setListType("list")}
          variant={listType === "list" ? "default" : "outline"}
        >
          리스트
        </Button>
        {isSeller && (
          <Button onClick={() => navigate("/product/register")}>
            상품 등록
          </Button>
        )}
      </div>

      {/* 통합된 뷰 레이아웃 */}
      <div className="flex flex-col">
        <div className="flex w-full">
          {/* 공통 SortOptions */}
          <SortOptions
            selectedSortOption={selectedCategory}
            setSelectSortOption={setSelectedCategory}
            filterProduct={filterProduct}
            resetProduct={resetProduct}
            selectedPagingCount={selectedPagingCount}
            setSelectedPagingCount={setSelectedPagingCount}
          />

          {/* 컨텐츠 영역 - 조건부 렌더링 */}
          <div className="w-4/5 p-4">
            {listType === "list" ? (
              <ProductList products={filteredProducts} />
            ) : (
              <CardListLayout products={filteredProducts} />
            )}
          </div>
        </div>

        {/* 공통 스크롤 감지 요소 */}
        <div
          ref={scrollRef}
          className="w-full h-20 flex items-center justify-center my-4"
        >
          {loading && <div>로딩 중...</div>}
          {!hasMore && filteredProducts.length > 0 && (
            <div className="text-gray-400">모든 상품을 불러왔습니다</div>
          )}
        </div>
      </div>
    </div>
  );
}
