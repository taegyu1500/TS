import { PendingContext } from "@/context/PendingContext";
import React, { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import PendingTableLayout from "@/layouts/pendingTableLayout";

export default function PendingPage() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error("usePending must be used within a PendingProvider");

  return (
    <React.Fragment>
      {context.productList.length > 0 ? (
        <PendingTableLayout />
      ) : (
        <div>상품이 없습니다</div>
      )}
      <Separator />
      {context.calcPrice() > 0 && <div>총 가격:{context.calcPrice()}원</div>}
    </React.Fragment>
  );
}
