import { useFunnel } from "@/hook/useFunnel";
import GenericForm from "@/components/common/GenericForm";
import RegisterSetup from "@/components/formSetup/registerSetup";
import register from "@/components/firebase/register";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = ["사용자 정보 선택", "로그인 정보"];

const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .refine(
    (value) => {
      const regex =
        /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z]))([A-Za-z\d@$!%*#?&]|[^A-Za-z0-9]){8,20}$/;
      return regex.test(value);
    },
    {
      message:
        "비밀번호는 8자 이상 20자 이하이며, 영문 대소문자, 특수문자, 숫자 중 2개를 포함해야 합니다.",
    }
  );

const schema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  nickname: z.string(),
  button: z.string(),
});

interface FormData {
  email: string;
  password: string;
  nickname: string;
  button: string;
}

const RegisterPage = () => {
  const Navigate = useNavigate();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };

  const handleSubmit = (data: FormData) => {
    const isSeller = data.button === "Seller"; // data.button의 값이 "Seller"인지 확인합니다.
    register(data.email, data.password, data.nickname, isSeller) // isSeller 값을 register 함수에 전달합니다.
      .then(() => {
        console.log("회원 가입 성공!");
        Navigate("/");
      });
  };

  return (
    <GenericForm
      onSubmit={handleSubmit}
      formOptions={{ resolver: zodResolver(schema) }}
    >
      <RegisterSetup
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </GenericForm>
  );
};

export default RegisterPage;
