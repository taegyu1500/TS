import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button
        variant="outline"
        className="absolute top-4 left-4"
        onClick={handleGoBack}
      >
        <ChevronLeft className="mr-2" />
        뒤로가기
      </Button>
      <Separator className="my-4" />
      <div className="text-center">프로필 페이지</div>
    </div>
  );
};
