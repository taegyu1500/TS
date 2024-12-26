import Product from "@/type/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import PriceFormat from "@/view/fragmentPages/priceFormat";
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const Navigate = useNavigate();
  const handleClick = (id: string) => {
    console.log(id);
    Navigate(`${id}`);
  };
  return (
    <Table>
      {products.length === 0 ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              등록된 상품이 없습니다.
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <>
          <TableHeader>
            <TableRow>
              <TableHead>카테고리</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id?.toString() ?? ""}
                onClick={() => handleClick(product.id?.toString() ?? "")}
                className="hover:cursor-pointer"
              >
                {/* <TableCell>{product.productImage}</TableCell> */}
                <TableCell>{product.productCategory}</TableCell>
                <TableCell
                  onClick={() => handleClick(product.id?.toString() ?? "")}
                >
                  {product.productName}
                </TableCell>
                <TableCell>
                  <PriceFormat price={product.productPrice} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
}
