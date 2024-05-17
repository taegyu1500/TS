import React from "react";
import { Separator } from "@/components/ui/separator";
import PendingTableLayout from "@/layouts/pendingTableLayout";
import { useQuery } from "react-query";
import { callShoppingList } from "@/util/firebaseFunctions";
import { auth } from "@/firebase";

const MemorizedPendingTableLayout = React.memo(PendingTableLayout);

export default function PendingPage() {
  const { data: shoppingList = [] } = useQuery("shoppingList", () =>
    callShoppingList(auth.currentUser?.uid || "")
  );
  const totalPrice = shoppingList.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  return (
    <React.Fragment>
      {shoppingList.length > 0 ? (
        <MemorizedPendingTableLayout />
      ) : (
        <div>상품이 없습니다</div>
      )}
      <Separator />
      {totalPrice && <div>총 가격:{totalPrice}원</div>}
    </React.Fragment>
  );
}
