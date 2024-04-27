import { useFunnel } from "@/hook/useFunnel";
import GenericForm from "@/components/common/GenericForm";
import RegisterSetup from "@/components/formSetup/registerSetup";
import registerProduct from "@/components/firebase/registerProduct";
import { useNavigate } from "react-router-dom";
const steps = ["사용자 정보 선택", "로그인 정보"];

interface FormData {
  category: string;
  description: string;
  quantity: string;
  price: number;
  file: string[];
}

const RegisterPage = () => {
  const Navigate = useNavigate();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };

  const handleSubmit = (data: FormData) => {
    registerProduct() // isSeller 값을 register 함수에 전달합니다.
      .then(() => {
        console.log("회원 가입 성공!");
        Navigate("/");
      });
  };

  return (
    <GenericForm onSubmit={handleSubmit}>
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
