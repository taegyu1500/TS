import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/context/ModalContext";
import { useAuth } from "@/hook/useAuth";
import { getMenu } from "@/type/Menu";

export default function NavigationLayout() {
  const menu = getMenu(useAuth().isLogged);
  const Navigate = useNavigate();
  const context = useContext(ModalContext);
  const openModal = () => {
    if (!context)
      throw new Error("useModal must be used within a ModalProvider");
    console.log("openModal");
    context.openModal("PendingPage", "alert");
  };
  return (
    <nav className="bg-white border-b">
      {/* 여기에 menu로 받아온 것주에 modal 트루인건 누르면 modal 열리고 나머지는 navigate */}
      <div className="flex space-x-6 p-4 text-sm text-gray-700 justify-center">
        {menu.map((item, index) => {
          if (item.modal) {
            return (
              <Button key={index} onClick={openModal} variant="outline">
                {item.title}
              </Button>
            );
          }
          return (
            <Button
              key={index}
              onClick={() => Navigate(item.nav)}
              variant="outline"
            >
              {item.title}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}

// Path: src/layouts/navigationLayout.tsx
