import Product from "@/type/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface ProductListProps {
  products: Product[];
}
console.log("ProductList.tsx");

export default function ProductList({ products }: ProductListProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>이미지</TableCell>
          <TableCell>수량</TableCell>
          <TableCell>가격</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.productImage}</TableCell>
            <TableCell>{product.productQuantity}</TableCell>
            <TableCell>{product.productPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
