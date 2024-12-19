import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { callShoppingList, deleteShoppingList } from "@/util/firebaseFunctions";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import PriceFormat from "@/view/fragmentPages/priceFormat";

const PendingTableLayout = () => {
  const queryClient = useQueryClient();
  const { data: shoppingList } = useQuery("shoppingList", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );

  const deleteMutation = useMutation(deleteShoppingList);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("shoppingList");
      },
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>상품명</TableHead>
          <TableHead>수량</TableHead>
          <TableHead>가격</TableHead>
          {location.pathname === "/payment" ? null : (
            <TableHead>삭제</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shoppingList?.map((shopping) => (
          <TableRow key={shopping.id}>
            <TableCell>{shopping.productName}</TableCell>
            <TableCell>
              {location.pathname === "/payment" ? (
                shopping.quantity
              ) : (
                <Button disabled>{shopping.quantity}</Button>
              )}
            </TableCell>
            <TableCell>
              <PriceFormat price={shopping.productPrice * shopping.quantity} />
            </TableCell>
            {location.pathname === "/payment" ? null : (
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() =>
                    shopping.id && handleDelete(shopping.id.toString())
                  }
                >
                  삭제
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PendingTableLayout;
