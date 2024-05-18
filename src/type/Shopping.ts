type Shopping = {
  id?: string | number;
  productPrice: number;
  productQuantity: number;
  productName: string | number;
  createdAt: Date | null;
  updatedAt: Date | null;
  sellerId: number | string;
  productImage: Array<string>;
  productCategory: "의류" | "가전제품" | "가구" | "생활용품" | "식품" | "기타";
  productDescription: string;
  quantity: number;
  owner: string;
};

export default Shopping;
