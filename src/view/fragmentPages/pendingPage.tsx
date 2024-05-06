import PendingLayout from "@/layouts/pendingLayout";
import { PendingContext } from "@/context/PendingContext";
import React, { useContext } from "react";
import { Separator } from "@/components/ui/separator";

export default function PendingPage() {
  const context = useContext(PendingContext);
  if (!context)
    throw new Error("usePending must be used within a PendingProvider");

  return (
    <React.Fragment>
      {context.productList.map((product, index) => (
        <PendingLayout key={product.id} product={product} order={index + 1} />
      ))}
      <Separator />
      {context.calcPrice() > 0 && <div>총 가격:{context.calcPrice()}원</div>}
    </React.Fragment>
  );
}
