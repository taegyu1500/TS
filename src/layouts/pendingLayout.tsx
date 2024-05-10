import Product from "@/type/Product";

interface ExtendedProduct extends Product {
  quantity?: number;
}

export default function PendingLayout({
  product,
  order,
}: {
  product: ExtendedProduct;
  order: number;
}) {
  return (
    <div className="flex horizontal space-between">
      <div className="m-2">{order}</div>
      <div className="m-2">{product.productName}</div>
      <div className="m-2">{product.quantity}</div>
      <div className="m-2">{product.productPrice}</div>
    </div>
  );
}
