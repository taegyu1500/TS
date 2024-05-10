// 결제 확인 겸사겸사 결제할 상품 리스트와 결제 버튼, 결제 가격을 보여주는 레이아웃

import PaymentLayout from "../layouts/paymentLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PendingPage from "@/view/fragmentPages/pendingPage";

const OrderPage = () => {
  return (
    <Card>
      <CardHeader>
        <h1>주문 확인</h1>
      </CardHeader>
      <CardContent>
        <PendingPage />
        <PaymentLayout />
      </CardContent>
    </Card>
  );
};

export default OrderPage;
