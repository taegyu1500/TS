import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  callShoppingList,
  updateShoppingQuantity,
  deleteShoppingList,
} from "@/util/firebaseFunctions";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";

const PendingTableLayout = () => {
  const queryClient = useQueryClient();
  const { data: shoppingList, refetch } = useQuery("shoppingList", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );
  const updateMutation = useMutation((data: { id: string; delta: number }) =>
    updateShoppingQuantity(data.id, data.delta)
  );
  const deleteMutation = useMutation(deleteShoppingList);

  const handleQuantityChange = (id: string, delta: number) => {
    console.log(
      "handleQuantityChange called with id:",
      id,
      "and delta:",
      delta
    );
    updateMutation.mutate(
      { id, delta },
      {
        onSuccess: () => {
          console.log("onSuccess called");
          refetch();
        },
        onError: (error) => {
          console.log("onError called");
          console.error(error);
        },
      }
    );
  };

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
                <>
                  <Button
                    onClick={() =>
                      shopping.id &&
                      handleQuantityChange(shopping.id.toString(), -1)
                    }
                  >
                    -
                  </Button>
                  {shopping.quantity}
                  <Button
                    onClick={() =>
                      shopping.id &&
                      handleQuantityChange(shopping.id.toString(), 1)
                    }
                  >
                    +
                  </Button>
                </>
              )}
            </TableCell>
            <TableCell>{shopping.productPrice * shopping.quantity}</TableCell>
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
