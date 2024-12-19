import Shopping from "@/type/Shopping";
import requestPayment from "@/components/payment/requestPayment";
import createOrder from "@/components/payment/createOrder";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { callShoppingList } from "@/util/firebaseFunctions";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";

const PaymentLayout = () => {
  const { data: shoppingList } = useQuery("shoppingList", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleRequest = (shoppingList: Shopping[]) => {
    if (!shoppingList || shoppingList.length < 1) {
      console.error("상품이 없습니다");
      return;
    }
    request(shoppingList);
  };

  const request = async (shoppingList: Shopping[]) => {
    for (const shopping of shoppingList) {
      // productName이 영문 대소문자, 숫자, 특문(-, _)만 허용되야 하기 때문에 만약 다른 문자가 들어가 있다면 바꿔주는 로직이 필요
      const orderName = `${formatDate(new Date())}_order_${
        crypto.getRandomValues(new Uint32Array(1))[0]
      }`;
      console.log(typeof shopping.quantity, typeof shopping.productPrice);
      const response = await requestPayment({
        orderName: orderName,
        totalAmount: shopping.quantity * shopping.productPrice, // Use shopping.productQuantity
      });

      if (response instanceof Error) {
        console.error("결제 실패");
        return;
      }

      if (response.code === "success") {
        createOrder({
          sellerId: shopping.sellerId.toString(),
          buyerId: shopping.owner ? shopping.owner.toString() : "", // Use shopping.owner
          productId: shopping.id ? shopping.id.toString() : "",
          productQuantity: shopping.productQuantity,
          Status: "주문 완료",
          id: response.paymentId?.toString() || "", // Add null check for response.paymentId
        }).then(() => {
          console.log("주문 완료");
          navigate("/order");
        });
      }
    }
  };

  return (
    <div>
      <Button onClick={() => handleRequest(shoppingList as Shopping[])}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentLayout;
