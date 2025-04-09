import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SliderLayout from "@/layouts/sliderLayout";
import { ChevronRight, Heart, Star, TrendingUp, Package } from "lucide-react";
import { useAuth } from "@/hook/useAuth";
import { ShoppingBag } from "lucide-react";

export default function PublicMain() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // currentUser만 가져오기

  // 카테고리 데이터 (실제 사용 시 API에서 가져오기)
  const categories = [
    { name: "의류", icon: "👕", path: "/product?category=의류" },
    { name: "가전제품", icon: "🖥️", path: "/product?category=가전제품" },
    { name: "가구", icon: "🪑", path: "/product?category=가구" },
    { name: "생활용품", icon: "🧴", path: "/product?category=생활용품" },
    { name: "식품", icon: "🍎", path: "/product?category=식품" },
    { name: "기타", icon: "📦", path: "/product?category=기타" },
  ];

  // 추천 상품 데이터 (실제 사용 시 API에서 가져오기)
  const featuredProducts = [
    {
      id: 1,
      name: "프리미엄 헤드폰",
      price: 89000,
      image: "/images/headphones.jpg",
      category: "가전제품",
    },
    {
      id: 2,
      name: "편안한 소파",
      price: 299000,
      image: "/images/sofa.jpg",
      category: "가구",
    },
    {
      id: 3,
      name: "스타일리시 재킷",
      price: 78000,
      image: "/images/jacket.jpg",
      category: "의류",
    },
    {
      id: 4,
      name: "스마트 워치",
      price: 129000,
      image: "/images/smartwatch.jpg",
      category: "가전제품",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative w-full">
        <SliderLayout
          images={["hero1.jpg", "hero2.jpg", "hero3.jpg"]}
          // @ts-expect-error 이렇게 해야 정상작동함
          autoPlay={true}
          interval={5000}
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6 bg-black/30 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentUser
              ? `${currentUser.displayName || "회원"}님, 환영합니다`
              : "쇼핑의 새로운 경험"}
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            프리미엄 제품을 특별한 가격으로 만나보세요
          </p>
          <div className="flex gap-4">
            {/* 로그인 여부에 따라 하나의 버튼으로 동작 변경 */}
            <Button
              size="lg"
              onClick={() => navigate(currentUser ? "/product" : "/login")}
              className="bg-white text-black hover:bg-gray-100"
            >
              {currentUser ? "쇼핑 시작하기" : "로그인하기"}
            </Button>
          </div>
        </div>
      </section>

      {/* 가치 제안 섹션 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <TrendingUp size={40} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">엄선된 상품</h3>
              <p className="text-gray-600">
                최고 품질의 제품만을 엄선하여 제공합니다
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <Star size={40} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">만족도 보장</h3>
              <p className="text-gray-600">고객 만족을 최우선으로 생각합니다</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <Package size={40} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">빠른 배송</h3>
              <p className="text-gray-600">
                주문 후 최대한 빠르게 배송해 드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">인기 카테고리</h2>
            <Button variant="ghost" onClick={() => navigate("/categories")}>
              모두 보기 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => navigate(category.path)}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">인기 상품</h2>
            <Button variant="ghost" onClick={() => navigate("/product")}>
              더 많은 상품 보기 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100">
                    <Heart size={18} className="text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-sm text-blue-600 mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="font-medium mb-2 hover:text-blue-600">
                    {product.name}
                  </h3>
                  <p className="font-bold text-lg">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로모션 배너 - currentUser 기반 조건부 렌더링 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden">
            {/* 배경색 조건부 변경 */}
            <div
              className={`h-64 bg-gradient-to-r ${
                currentUser
                  ? "from-green-600 to-teal-600"
                  : "from-blue-600 to-purple-600"
              }`}
            ></div>

            <div className="absolute inset-0 flex items-center justify-between p-8 text-white">
              <div className="max-w-lg">
                {/* 비로그인 사용자를 위한 콘텐츠 */}
                {!currentUser ? (
                  <>
                    <h2 className="text-3xl font-bold mb-4">
                      회원가입 특별 할인
                    </h2>
                    <p className="text-lg mb-6">
                      지금 가입하고 15% 할인 쿠폰을 받아가세요!
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate("/signup")}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      지금 가입하기
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-4">특별 할인 혜택</h2>
                    <p className="text-lg mb-6">
                      {currentUser.displayName || "회원"}님을 위한 맞춤 추천
                      상품을 확인하세요
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate("/product")}
                      className="bg-white text-teal-600 hover:bg-gray-100"
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      추천 상품 보기
                    </Button>
                  </>
                )}
              </div>
              <div className="hidden md:block">{/* 프로모션 이미지 */}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
