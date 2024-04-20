// 전체 레이아웃이 될 MainLayout 컴포넌트를 생성합니다.
import BodyLayout from "./bodyLayout";
import HeaderLayout from "./headerLayout";
import NavigationLayout from "./navigationLayout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <HeaderLayout />
      <NavigationLayout />
      <BodyLayout children={<Outlet />} />
    </div>
  );
}
