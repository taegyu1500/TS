import React from "react";
import Titlelayout from "./titleLayout";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="relative flex items-center justify-between p-4 bg-gray-100 h-16">
      <div className="flex items-center space-x-4">
        <Titlelayout />
      </div>
      <div className="flex-1 flex justify-center">{children}</div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600">카테고리</button>
        <button className="text-gray-600">마이쇼핑</button>
        <button className="text-gray-600">장바구니</button>
      </div>
    </header>
  );
}
