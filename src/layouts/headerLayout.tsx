import Titlelayout from "./titleLayout";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Titlelayout />
        <div className="flex gap-4">
          {!auth.currentUser && (
            <div>
              <button
                className="btn"
                onClick={() => {
                  Navigate("/login");
                }}
              >
                로그인
              </button>
              <button
                className="btn"
                onClick={() => {
                  Navigate("/register");
                }}
              >
                회원가입
              </button>
            </div>
          )}
          {auth.currentUser && (
            <div>
              <button className="btn" onClick={openModal}>
                장바구니
              </button>
              <button className="btn" onClick={() => Navigate("/payment")}>
                결제하기
              </button>
              <button
                className="btn"
                onClick={() => {
                  auth.signOut();
                  alert("로그아웃 되었습니다.");
                  Navigate("/");
                }}
              >
                로그아웃
              </button>
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
