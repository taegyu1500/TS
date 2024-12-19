import Titlelayout from "./titleLayout";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function HeaderLayout() {
  const Navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        <Titlelayout />
      </div>
      <Input
        type="search"
        placeholder="상품명 또는 브랜드 입력"
        className="border rounded-md px-4 py-2 w-1/3"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            Navigate(`/search/${e.currentTarget.value}`);
          }
        }}
      />
      <div className="flex items-center space-x-4">
        <button className="text-gray-600">카테고리</button>
        <button className="text-gray-600">마이쇼핑</button>
        <button className="text-gray-600">장바구니</button>
      </div>
    </header>
  );
}
