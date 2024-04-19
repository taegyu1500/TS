// 전체 레이아웃이 될 MainLayout 컴포넌트를 생성합니다.
import NavigationLayout from "./navigationLayout";
import Titlelayout from "./titleLayout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Titlelayout />
      <NavigationLayout />
      <Outlet />
    </div>
  );
}
