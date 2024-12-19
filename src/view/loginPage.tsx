import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/inputs/textInput";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "@/util/firebaseFunctions";
import GenericForm from "@/components/common/GenericForm";
import { useToast } from "@/components/ui/use-toast";

interface LoginPageProps {
  email: string;
  password: string;
}

export default function LoginPage() {
  const Navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (data: LoginPageProps) => {
    login(data.email, data.password)
      .then(() => {
        console.log("로그인 성공!");
        Navigate("/");
      })
      .catch((error) => {
        toast({
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
        console.error(error);
      });
  };
  const googleLoginButtonClick = () => {
    googleLogin()
      .then(() => {
        console.log("로그인 성공!");
        Navigate("/");
      })
      .catch((error) => {
        toast({
          title: "로그인 실패",
          description: "구글 로그인에 실패했습니다.",
        });
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <GenericForm onSubmit={onSubmit}>
        <div className="grid gap-2">
          <TextInput
            label="이메일"
            id="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="grid gap-2">
          <TextInput
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={googleLoginButtonClick}
        >
          구글로 로그인하기
        </Button>
        <div className="mt-4 text-center text-sm">
          아이디가 없으신가요?
          <Link to="/register" className="underline">
            회원 가입
          </Link>
        </div>
      </GenericForm>
    </div>
  );
}
