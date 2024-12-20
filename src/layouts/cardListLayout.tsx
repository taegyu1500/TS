import Product from "@/type/Product";
import ProductLayout from "./productLayout";

export default function CardListLayout({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <ProductLayout key={product.id} product={product} />
      ))}
    </div>
  );
}
