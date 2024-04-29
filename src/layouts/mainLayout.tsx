import { Toaster } from "@/components/ui/toaster";
import BodyLayout from "./bodyLayout";
import HeaderLayout from "./headerLayout";
import NavigationLayout from "./navigationLayout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Toaster />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <HeaderLayout />
        <NavigationLayout />
        <BodyLayout>
          <Outlet />
        </BodyLayout>
      </div>
    </div>
  );
}
