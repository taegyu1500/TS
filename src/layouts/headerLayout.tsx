import React, { useState, useRef, useEffect } from "react";
import Titlelayout from "./titleLayout";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "@/hook/useAuth.tsx";
import { useQuery } from "react-query";
import { callShoppingList } from "@/util/firebaseFunctions.tsx";
import { auth } from "@/firebase.ts";
import PriceFormat from "@/view/fragmentPages/priceFormat.tsx";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const { data: shoppingList } = useQuery("shoppingList", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const Count = shoppingList ? shoppingList.length : 0;

  // 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 클린업: 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* 데스크탑 헤더 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <Titlelayout />
          </div>

          {/* 검색 영역 - 중앙 배치 */}
          <div className="hidden md:flex flex-1 justify-center w-full max-w-2xl mx-4">
            {children}
          </div>

          {/* 네비게이션 버튼 */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/product")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              상품보기
            </button>
            {/* 마이페이지 버튼 - 로그인 상태일 때만 표시 */}
            {isLogged && (
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
              >
                <User size={18} />
                <span>마이페이지</span>
              </button>
            )}

            {/* 장바구니 드롭다운 - 위치 수정 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1 relative"
              >
                <ShoppingCart size={18} />
                <span>장바구니</span>
                {Count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Count}
                  </span>
                )}
              </button>

              {/* 드롭다운 메뉴 - 직접 구현하여 위치 제어 */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      장바구니 ({Count})
                    </h3>

                    {!shoppingList || shoppingList.length === 0 ? (
                      <div className="py-6 text-center text-gray-500">
                        장바구니가 비어있습니다
                      </div>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto py-2">
                          {shoppingList.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex items-center py-2 border-b"
                            >
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium truncate">
                                  {item.productName}
                                </p>
                                <div className="flex justify-between">
                                  <p className="text-sm text-gray-600">
                                    <PriceFormat price={item.productPrice} /> ×{" "}
                                    {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-2 border-t">
                          <div className="flex justify-between font-medium mb-4">
                            <span>합계:</span>
                            <span>
                              <PriceFormat
                                price={shoppingList.reduce(
                                  (total: number, item: any) =>
                                    total +
                                    item.productPrice * (item.quantity || 1),
                                  0
                                )}
                              />
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setDropdownOpen(false)}
                              className="py-2 px-4 border rounded text-sm hover:bg-gray-50"
                            >
                              계속 쇼핑하기
                            </button>
                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                navigate("/payment");
                              }}
                              className="py-2 px-4 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              결제하기
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate(isLogged ? "/logout" : "/login")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
            >
              <User size={18} />
              <span>{isLogged ? "로그아웃" : "로그인"}</span>
            </button>
          </div>

          {/* 모바일 메뉴 버튼 - 위치 수정 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 (토글) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            {/* 모바일 검색창 */}
            <div className="mb-4">{children}</div>

            {/* 모바일 네비게이션 */}
            <nav className="space-y-3">
              <button
                onClick={() => navigate("/categories")}
                className="block w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-2 rounded"
              >
                카테고리
              </button>

              <button
                onClick={() => navigate(isLogged ? "/my-account" : "/login")}
                className=" w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-2 rounded flex items-center gap-2"
              >
                <User size={18} />
                <span>마이쇼핑</span>
              </button>

              <button
                onClick={() => navigate("/cart")}
                className=" w-full text-left py-2 text-gray-700 hover:bg-gray-50 px-2 rounded flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>장바구니</span>
                {Count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                    {Count}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
