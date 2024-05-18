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
      <TableHeader>
        <TableRow>
          <TableHead>카테고리</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>수량</TableHead>
          <TableHead>가격</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product.id?.toString() ?? ""}
            onClick={() => handleClick(product.id?.toString() ?? "")}
          >
            {/* <TableCell>{product.productImage}</TableCell> */}
            <TableCell>{product.productCategory}</TableCell>
            <TableCell
              onClick={() => handleClick(product.id?.toString() ?? "")}
            >
              {product.productName}
            </TableCell>
            <TableCell>{product.productQuantity}</TableCell>
            <TableCell>{product.productPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
