import { Toaster } from "@/components/ui/toaster";
import BodyLayout from "./bodyLayout";
import HeaderLayout from "./headerLayout";
import NavigationLayout from "./navigationLayout";
import { Outlet } from "react-router-dom";
import { PendingProvider } from "@/context/PendingContext";
import { ModalProvider } from "@/context/ModalContext";
import QueryContext from "@/context/QueryContext";
export default function MainLayout() {
  return (
    <div>
      <Toaster />

      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <NavigationLayout />
        <BodyLayout>
          <QueryContext>
            <PendingProvider>
              <ModalProvider>
                <HeaderLayout />
                <Outlet />
              </ModalProvider>
            </PendingProvider>
          </QueryContext>
        </BodyLayout>
      </div>
    </div>
  );
}
