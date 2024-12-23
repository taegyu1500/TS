import Product from "@/type/Product";
import ProductLayout from "./productLayout";

export default function CardListLayout({ products }: { products: Product[] }) {
  return (
    <>
      {products.length === 0 ? (
        <div>등록된 상품이 없습니다.</div>
      ) : (
        <div className="flex flex-wrap w-full">
          {products.map((product) => (
            <ProductLayout key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
