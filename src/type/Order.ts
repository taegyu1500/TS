type Order = {
  id: string;
  sellerId: string;
  buyerId: string;
  productId: number;
  productQuantity: number;
  Status: "주문 완료" | "발송 대기" | "발송 시작" | "주문 취소";
  createAt: Date;
  updateAt: Date;
};

export default Order;
