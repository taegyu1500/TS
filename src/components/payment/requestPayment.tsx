import * as PortOne from "@portone/browser-sdk/v2";

function requestPayment({
  orderName,
  totalAmount,
}: {
  orderName: string;
  totalAmount: number;
}) {
  PortOne.requestPayment({
    storeId: import.meta.env.VITE_PORTONE_API_KEY, // 고객사 storeId로 변경해주세요.
    paymentId: `payment-{${crypto.randomUUID()}`,
    orderName: orderName,
    totalAmount: totalAmount,
    currency: "CURRENCY_KRW",
    channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY, // 콘솔 결제 연동 화면에서 채널 연동 시 생성된 채널 키를 입력해주세요.
    payMethod: "CARD",
  }).then((response) => {
    if (response && response.code === "success") {
      return response;
    } else {
      return Error("결재 실패");
    }
  });
}

export default requestPayment;
