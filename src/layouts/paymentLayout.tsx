import Product from "@/type/Product";
import Order from "@/type/Order";
import requestPayment from "@/components/payment/requestPayment";
import createOrder from "@/components/payment/createOrder";

const PaymentLayout = () => {
  const products: Product[] = []; // 상품 정보를 가져와야 합니다.

  const request = async (products: Product[]) => {
    // 비동기 함수로 변경
    for (const product of products) {
      const response = await requestPayment({
        // await 키워드 추가
        orderName: product.productName.toString(),
        totalAmount: product.productQuantity,
      });

      if (response instanceof Error) {
        console.error("결재 실패");
        return;
      }

      if (response.code === "success") {
        const order: Order = {
          sellerId: product.sellerId.toString(),
          buyerId: "buyerId",
          productId: product.productId,
          productQuantity: product.productQuantity,
          Status: "주문 완료",
          createAt: new Date(),
          updateAt: new Date(),
        };
        createOrder(order);
      }
    }
  };

  return (
    <div>
      <button onClick={() => request(products)}>결제하기</button>
    </div>
  );
};

export default PaymentLayout;
