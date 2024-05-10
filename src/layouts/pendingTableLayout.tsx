import { Table, TableCell, TableRow } from "@/components/ui/table";
import { useQuery } from "react-query";
import { callShoppingList } from "@/components/firebase/callShopingList";
import { auth } from "@/firebase";

const PendingTableLayout = () => {
  const { data: products } = useQuery("products", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );

  return (
    <Table>
      <TableRow>
        <th>상품명</th>
        <th>수량</th>
        <th>가격</th>
      </TableRow>
      {products?.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.productName}</TableCell>
          <TableCell>{product.productQuantity}</TableCell>
          <TableCell>{product.productPrice}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default PendingTableLayout;
