// 장바구니 기능(pendingLayout.tsx)을 모달이 아니라 드롭다운으로 구현해서 헤더에서 사용
import React from "react";

export default function DropdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block text-left">
      <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-10">
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}
