type Product = {
  id: number;
  productPrice: number;
  productQuantity: number;
  productName: number;
  createdAt: Date;
  updatedAt: Date;
  sellerId: number;
  productImage: Array<string>;
  productCategory: string;
  productDescription: string;
};

export default Product;
