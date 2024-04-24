import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/inputs/textInput";

import login from "@/components/firebase/login";
import GenericForm from "@/components/common/GenericForm";

interface LoginPageProps {
  email: string;
  password: string;
}

export default function LoginPage() {
  const onSubmit = (data: LoginPageProps) => {
    login(data.email, data.password).then(() => {
      console.log("로그인 성공!");
    });
  };

  return (
    <div className="grid gap-4">
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
        <Button variant="outline" className="w-full">
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
