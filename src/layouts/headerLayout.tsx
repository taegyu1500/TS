import Titlelayout from "./titleLayout";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeaderLayout() {
  const context = useContext(ModalContext);
  const Navigate = useNavigate();
  const openModal = () => {
    if (!context)
      throw new Error("useModal must be used within a ModalProvider");
    console.log("openModal");
    context.openModal("PendingPage");
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-5">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Titlelayout />
        <div className="flex gap-4">
          <div>
            <Button className="btn" onClick={() => Navigate("/product")}>
              상품
            </Button>
          </div>
          {!auth.currentUser && (
            <div className="flex gap-4">
              <Button
                className="btn"
                onClick={() => {
                  Navigate("/login");
                }}
              >
                로그인
              </Button>
              <Button
                className="btn"
                onClick={() => {
                  Navigate("/register");
                }}
              >
                회원가입
              </Button>
            </div>
          )}
          {auth.currentUser && (
            <div className="flex gap-4">
              <Button className="btn" onClick={openModal}>
                장바구니
              </Button>
              <Button className="btn" onClick={() => Navigate("/payment")}>
                결제하기
              </Button>
              <Button
                className="btn"
                onClick={() => {
                  auth.signOut();
                  alert("로그아웃 되었습니다.");
                  Navigate("/");
                }}
              >
                로그아웃
              </Button>
            </div>
          )}
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </header>
    </div>
  );
}
