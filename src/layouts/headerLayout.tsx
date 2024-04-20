import Titlelayout from "./titleLayout";
import { Input } from "@/components/ui/input";

export default function HeaderLayout() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Titlelayout />
        <div className="flex gap-4">
          <button className="btn">로그인</button>
          <button className="btn">회원가입</button>
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
