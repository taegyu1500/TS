import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const Navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="text-center text-2xl font-bold">
        에러 발생!
        <>이런!</>
        <div>무언가 잘못되었습니다!</div>
        <div>아래 버튼을 통해 메인페이지로 이동해 다시 진행해주세요!</div>
      </div>
      <Button onClick={() => Navigate("/")}>메인 페이지로 이동</Button>
    </div>
  );
}
