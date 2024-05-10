import Product from "@/type/Product";
import requestPayment from "@/components/payment/requestPayment";
import createOrder from "@/components/payment/createOrder";
import getCurrentUserId from "@/components/firebase/getCurrentUserId";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { callShoppingList } from "@/components/firebase/callShopingList";
import { auth } from "@/firebase";

const PaymentLayout = () => {
  const { data: products } = useQuery("products", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );
  const { data: buyerId } = useQuery("buyerId", getCurrentUserId);
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleRequest = (products: Product[]) => {
    if (!products || products.length < 1) {
      console.error("상품이 없습니다");
      return;
    }
    request(products);
  };
  const request = async (products: Product[]) => {
    for (const product of products) {
      // productName이 영문 대소문자, 숫자, 특문(-, _)만 허용되야 하기 때문에 만약 다른 문자가 들어가 있다면 바꿔주는 로직이 필요
      const orderName = `${formatDate(new Date())}_order_${
        crypto.getRandomValues(new Uint32Array(1))[0]
      }`;
      console.log(orderName);
      const response = await requestPayment({
        orderName: orderName,
        totalAmount: product.productQuantity * product.productPrice,
      });

      if (response instanceof Error) {
        console.error("결재 실패");
        return;
      }

      if (response.code === "success") {
        createOrder({
          sellerId: product.sellerId.toString(),
          buyerId: buyerId ? buyerId.toString() : "",
          productId: product.id ? product.id.toString() : "",
          productQuantity: product.productQuantity,
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
      <button onClick={() => handleRequest(products as Product[])}>
        결제하기
      </button>
    </div>
  );
};

export default PaymentLayout;
