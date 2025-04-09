import { useState } from "react";
import PaymentLayout from "../layouts/paymentLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, ShoppingBag, AlertCircle } from "lucide-react";
import PendingPage from "@/view/fragmentPages/pendingPage";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast"; // toast 추가
import createOrder from "@/components/payment/createOrder";
import { useAuth } from "@/hook/useAuth.tsx";

const OrderPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); // toast 훅 추가
  const [testSuccess, setTestSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth(); // 현재 사용자 정보 가져오기
  console.log(currentUser);

  // 테스트용 쇼핑 데이터 (실제로는 상태나 전역 상태에서 가져와야 함)
  const mockShoppingData = {
    sellerId: "seller123",
    owner: "user456",
    buyerId: currentUser?.uid || "",
    id: "product789",
    productQuantity: 2,
    productName: "테스트 상품",
    productPrice: 78000,
  };

  const handleTestPayment = () => {
    setTestSuccess(true);
    setShowSuccess(true);

    // 결제 성공 처리 - 실제 주문 생성 로직 적용
    const response = { code: "success", paymentId: "pay_" + Date.now() };

    if (response.code === "success") {
      createOrder({
        sellerId: mockShoppingData.sellerId.toString(),
        buyerId: mockShoppingData.buyerId
          ? mockShoppingData.buyerId.toString()
          : "",
        productId: mockShoppingData.id ? mockShoppingData.id.toString() : "",
        productQuantity: mockShoppingData.productQuantity,
        Status: "주문 완료",
        id: response.paymentId?.toString() || "",
      }).then(() => {
        toast({
          title: "결제 성공",
          description: "결제가 성공적으로 완료되었습니다.",
        });

        // 3초 후 주문 페이지로 이동
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">주문 및 결제</h1>

      {/* 성공 알림 */}
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">
            결제가 성공적으로 완료되었습니다
          </AlertTitle>
          <AlertDescription className="text-green-700">
            주문이 생성되었습니다. 잠시 후 주문 내역 페이지로 이동합니다...
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 주문 정보 섹션 (왼쪽) */}
        <div className="lg:w-2/3 w-full">
          <Card className="shadow-md border-gray-200">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-blue-600" />
                <div>
                  <CardTitle className="text-xl text-gray-800">
                    주문 정보
                  </CardTitle>
                  <CardDescription>
                    주문할 상품과 배송 정보를 확인해주세요
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <PendingPage />
            </CardContent>
          </Card>
        </div>

        {/* 결제 섹션 (오른쪽) */}
        <div className="lg:w-1/3 w-full">
          <Card className="shadow-md border-gray-200 sticky top-24">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <CreditCard className="text-blue-600" />
                <div>
                  <CardTitle className="text-xl text-gray-800">
                    결제 정보
                  </CardTitle>
                  <CardDescription>
                    안전한 결제를 위해 정보를 확인해주세요
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 주문 요약 정보 */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-4">주문 요약</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품 금액</span>
                    <span className="font-medium">78,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송비</span>
                    <span className="font-medium">3,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">할인 금액</span>
                    <span className="font-medium text-red-500">-5,000원</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-medium text-lg">
                  <span>총 결제금액</span>
                  <span className="text-blue-600">76,000원</span>
                </div>
              </div>

              {/* 결제 방법 선택 */}
              <PaymentLayout />

              {/* 테스트 결제 버튼 섹션 */}
              <div className="mt-8 pt-4 border-t border-dashed">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-amber-500" />
                  <span className="text-sm text-gray-600">
                    테스트 목적으로만 사용하세요
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleTestPayment}
                    className="w-full py-6 bg-green-600 hover:bg-green-700"
                    disabled={testSuccess}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    {testSuccess ? "주문 생성 중..." : "테스트 결제 성공"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
