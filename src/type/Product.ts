type Product = {
  id: number;
  productPrice: number;
  productQuantity: number;
  productName: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  sellerId: number;
  productImage: Array<string>;
  productCategory: "의류" | "가전제품" | "가구" | "생활용품" | "식품" | "기타";
  productDescription: string;
};

export default Product;
